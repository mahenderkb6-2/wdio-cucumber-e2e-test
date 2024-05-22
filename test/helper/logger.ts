import winston from 'winston'

//Format console.log    ---> we're settingup the format in which we wanted to see in the console
const consoleFormat = winston.format.printf(({level, message}) => { //level is from process.env
    const logLevel = winston.format.colorize().colorize(level, `${level.toUpperCase()}`) //this log will be in uppercase
    return `[${logLevel}]: ${message}`
})
//Logger    ---> we're settingup the logger
let logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: process.env.LOG_LEVEL, //we're getting value from .env file
            handleExceptions: true,
            format: winston.format.combine(winston.format.timestamp(), consoleFormat)

        })
    ]
})
//Print any unkown error    ---> we're listening to the error, if in case it's going to be throwing an error
logger.on("error", error => {
    console.log(`Unkown error in winston logger`)
    console.log(error.message)
})
export default logger //--> with this we can import logger and we can able to use it like logger.info, logger.info, logger.error ...etc
         