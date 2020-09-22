const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const operations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

MongoClient.connect(url).then((client) => {
    console.log('Db Connection is successfull !!!');
    const db = client.db(dbName);
    return operations.insertDocument(db, 'dishes', {"name":"shakib", "designation": "SD"})
    .then((result) => {
        console.log('Inserted Document ', result.ops);
        return operations.findDocument(db, 'dishes');
    })
    .then((docs) => {
        console.log('All Documents are ', docs);
        return operations.updateDocument(db, 'dishes', {'name': 'shakib'}, {'designation': 'DEV'});
    })
    .then((result) => {
        console.log('Updated Document === ', result.result);
        return operations.findDocument(db, 'dishes');
    })
    .then((docs) => {
        console.log('After Update ', docs);
        return operations.deleteDocument(db, 'dishes', {'name': 'shakib'});
    })
    .then((result) => {
        console.log('Delete Successfll', result.result.n);
        return operations.findDocument(db, 'dishes');
    })
    .then((docs) => {
        console.log('After Delete ', docs);
    })
    .catch((err) => console.log(err));
}).catch((err) => console.log(err));