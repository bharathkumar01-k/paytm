const { MongoClient } = require('mongodb');
const config = require('./config');

const client = new MongoClient(config.mongodb_connection_string)

const getConnection = () =>{
    const db = client.db('paytm');
    return db;
}

const getMongoClient = () =>{
    return client
}

exports.getConnection = getConnection
exports.getMongoClient = getMongoClient