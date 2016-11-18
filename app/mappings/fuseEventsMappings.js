module.exports ={
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