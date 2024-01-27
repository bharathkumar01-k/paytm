const { MongoClient } = require('mongodb');

const client = new MongoClient()

const getConnection = () =>{
    const db = client.db('paytm');
    return db;
}

const getMongoClient = () =>{
    return client
}

exports.getConnection = getConnection
exports.getMongoClient = getMongoClient