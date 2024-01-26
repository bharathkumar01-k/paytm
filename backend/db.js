const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017')

const getConnection = () =>{
    const db = client.db('paytm');
    return db;
}

const getMongoClient = () =>{
    return client
}

exports.getConnection = getConnection
exports.getMongoClient = getMongoClient