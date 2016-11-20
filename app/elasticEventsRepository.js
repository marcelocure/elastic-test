const config = require('../config'),
      uuid = require('uuid-v4'),
      elasticsearch = require('elasticsearch'),
      fuseMappings = require('./mappings/fuseEventsMappings');

function getClient() {
    return new elasticsearch.Client({
        host: config.elasticUrl,
        log: 'trace'
    });
}

function errorHandler(err) {
    console.log(JSON.stringify(err))
    console.log('Error, Closing connection')
    return client.close()
}

module.exports = {
    setup : () => {
        const client = getClient();
        return client.indices.exists({index: "fuse-events"})
        .then(resp => {
            console.log(resp)
            if (resp) return
            return client.indices.create({
                index: config.eventsIndex,
                body: fuseMappings
            })
        })
        .then(() => {
            console.log('Closing connection')
            return client.close()
        })
        .catch(errorHandler);
    },
    createDocument: (body) => {
        const client = getClient();
        return client.index({
            index: config.eventsIndex,
            type: config.eventsType,
            id: uuid(),
            body: body
        })
        .then(() => {
            console.log('Closing connection')
            return client.close()
        })
        .catch(errorHandler);
    },
    search: (query) => {
        const client = getClient()
        var result
        return client.search({
            index: config.eventsIndex,
            type: config.eventsType,
            body: {
                query: query
            }
        })
        .then(resp => {
            result =  resp.hits.hits;
            console.log('Closing connection')
            return client.close()
        })
        .then(() => {
            return result;
        })
        .catch(errorHandler);
    }
}