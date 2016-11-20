const elasticEventsRepository = require('./app/elasticEventsRepository');
return elasticEventsRepository.setup()
.then(() => {
    const doc = {
        eventType: 'device.deactivated',
        body: 'body1',
        date: new Date().toString()
    }
    return elasticEventsRepository.createDocument(doc);
})
.then(() => {
    const query = {
      match: {
        eventType: 'device.deactivated'
      }
    }
    return elasticEventsRepository.search(query)
})
.then(result => {
    console.log(result)
})