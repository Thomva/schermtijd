var SerialPort = require('serialport')
var serialPort = new SerialPort('/dev/ttyS0', {
    baudRate: 9600
});
var Printer = require('thermalprinter');
var printer = new Printer(serialPort);

const activiteitController = require('./controllers/activiteit');

var input_argument = process.argv.slice(2);

if (!input_argument) {
    return 0;
}
var aantal_deelnemers = parseInt(input_argument[0]);
if (isNaN(aantal_deelnemers)) {
    return 0
}

var path = __dirname + '/logo-ffb-print.png';

serialPort.on('open', function () {
    printer.on('ready', function () {
        activiteitController.getRandomActiviteit(aantal_deelnemers, (activiteit) => {
            console.log(activiteit);
            try {
                printer.printImage(path);
                printer.printLine(' ');
                printer.horizontalLine(16);
                if (activiteit) {
                    printer.printLine(activiteit.titel);
                    printer.horizontalLine(16);
                    printer.printLine(activiteit.beschrijving);
                    if (activiteit.materiaal) {
                        printer.horizontalLine(16);
                        printer.printLine('Materiaal:');
                        printer.printLine(activiteit.materiaal);
                    }
                } else {
                    printer.printLine('Geen activiteit gevonden')
                }
                printer.horizontalLine(16);
                printer.printLine(' ');
                printer.printLine(' ');
                printer.print(function () {
                    console.log((activiteit) ? 'Activiteit geprint' : 'Lege activiteit geprint');
                    process.exit();
                })
            } catch (error) {
                console.log('error tijdens printen');
                process.exit();
            }
        });
    });
});