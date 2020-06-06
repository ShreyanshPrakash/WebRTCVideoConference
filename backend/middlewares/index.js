const {loggerMiddleware} = require('./logger.middleware');
const {staticServerMiddleware} = require('./staticserver.middleware');

module.exports = {
    loggerMiddleware,
    staticServerMiddleware,
}