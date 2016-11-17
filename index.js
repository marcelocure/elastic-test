var elasticsearch = require('elasticsearch');
var config = require('./config')

var client = new elasticsearch.Client({
  host: config.elasticUrl,
  log: 'trace'
});

var fuseMappings = {
            "mappings": {
                "fuse-event": {
                    "properties": {
                        "eventType": {"type": "string", "index": "not_analyzed"},
                        "body": {"type": "string", "index": "not_analyzed"},
                        "date": {"type": "string", "index": "not_analyzed"}
                    }
                }
            }
        }

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
    console.log('Creating doc')
    return client.index({
        index: 'fuse-events',
        type: 'fuse-event',
        id: '1',
        body: {
            eventType: 'eventType1',
            body: 'body1',
            date: 'date1'
        }
    })
})
.then(() => {
    console.log('Closing connection')
    return client.close()
})
.catch(err => {
    console.log(JSON.stringify(err))
    console.log('Error, Closing connection')
    return client.close()
})

// client.search({
//   index: 'twitter',
//   type: 'tweets',
//   body: {
//     query: {
//       match: {
//         body: {title: 'Test 1'}
//       }
//     }
//   }
// }).then(function (resp) {
//     var hits = resp.hits.hits;
//     console.log(hits);
// }, function (err) {
//     console.trace(err.message);
// });