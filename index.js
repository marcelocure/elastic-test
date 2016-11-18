// var elasticsearch = require('elasticsearch');
const elasticRepository = require('./app/elasticRepository');
return elasticRepository.setup()
.then(() => {
    const doc = {
        eventType: 'eventType1',
        body: 'body1',
        date: 'date1'
    }
    return elasticRepository.createDocument("fuse-events", "fuse-event", doc);
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