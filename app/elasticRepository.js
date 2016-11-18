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
                index: "fuse-events",
                body: fuseMappings
            })
        })
        .then(() => {
            console.log('Closing connection')
            return client.close()
        })
        .catch(errorHandler);
    },
    createDocument: (index, type, body) => {
        const client = getClient();
        return client.index({
            index: index,
            type: type,
            id: uuid(),
            body: body
        })
        .then(() => {
            console.log('Closing connection')
            return client.close()
        })
        .catch(errorHandler);
    },
    search: (index, type, query) => {
        const client = getClient();
        return client.search({
            index: index,
            type: type,
            body: {
                query: query
            }
        }).then(function (resp) {
            return resp.hits.hits;
        })
        .then(() => {
            console.log('Closing connection')
            return client.close()
        })
        .catch(errorHandler);
    }
}