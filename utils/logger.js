
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');

const esTransportOpts = {
    level: 'info'
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new Elasticsearch.ElasticsearchTransport({
            level: 'info',
            clientOpts: {
                node: "http://elasticsearch:9200",
                log: "info"
            }
        }) //everything info and above goes to elastic
    ]
});


module.exports = logger;
