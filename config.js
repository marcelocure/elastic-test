var config = {};
config.elasticUrl = process.env.ELASTIC_URL
config.eventsIndex = 'fuse-events',
config.eventsType = 'fuse-event'
module.exports = config;