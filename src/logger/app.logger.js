import * as winston from "winston";

let defaultFileSize = 5;
let defaultLogLevel = 'info';
let defaultMaxFiles = 10;

let logLevel = process.env.log_level ? process.env.log_level : defaultLogLevel;

let dateFormat = () => {
    return new Date(Date.now()).toISOString();
}

let logFormat = winston.format.printf(function(info) {
    let msg = info && info.message && (""+info.message) == '[object Object]' ? JSON.stringify(info.message) : info.message;
    let message = `${dateFormat()} | ${info.level.toUpperCase()} \t| ${msg}`;
    return message
});


let options = {
    file: {
        name: 'file',
        prettyPrint: true,
        level: process.env.log_debug_enabled ? 'debug' : logLevel,
        silent: false,
        colorize: false,
        timestamp: true,
        filename: `${__dirname}/../logs/app.log`,
        maxsize: (process.env.log_file_maxsize ? parseInt(process.env.log_file_maxsize) * 1024 * 1024 : defaultFileSize * 1024 * 1024),
        maxFiles: (process.env.log_file_maxfiles ? parseInt(process.env.log_file_maxfiles) : defaultMaxFiles),
        json: true
    },
    console: {
        name: 'console',
        level: process.env.log_debug_enabled ? 'debug' : logLevel,
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: false,
        handleExceptions: true,
        json: false
    }
}

let loggerOptions = {
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
    format : logFormat
};
if(process.env.log_file_enabled){
    loggerOptions.transports.push(new winston.transports.File(options.file));
}

let wlogger = winston.createLogger(loggerOptions);
export const logger = wlogger;
