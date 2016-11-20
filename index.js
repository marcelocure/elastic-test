const elasticRepository = require('./app/elasticRepository');
return elasticRepository.setup()
.then(() => {
    const doc = {
        eventType: 'device.deactivated',
        body: 'body1',
        date: new Date().toString()
    }
    return elasticRepository.createDocument("fuse-events", "fuse-event", doc);
})
.then(() => {
    const query = {
      match: {
        eventType: 'device.deactivated'
        // body: {eventType: 'device.activated'}
      }
    }
    return elasticRepository.search("fuse-events", "fuse-event", query)
})
.then(result => {
    console.log(result)
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