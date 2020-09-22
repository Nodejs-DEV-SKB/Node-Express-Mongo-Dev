const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const operations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Db Connection is successfull !!!');
    const db = client.db(dbName);
    const collection = db.collection('dishes');
    operations.insertDocument(db, 'dishes', {"name":"shakib", "designation": "SD"}, (result) => {
        console.log('Inserted Document ', result.ops);
        operations.findDocument(db, 'dishes', (docs) => {
            console.log('All Documents are ', docs);
            operations.updateDocument(db, 'dishes', {'name': 'shakib'}, {'designation': 'DEV'}, (result) => {
                console.log('Updated Document === ', result.result);
                operations.findDocument(db, 'dishes', (docs) => {
                    console.log('After Update ', docs);
                    operations.deleteDocument(db, 'dishes', {'name': 'shakib'}, (result) => {
                        console.log('Delete Successfll', result.result.n);
                        operations.findDocument(db, 'dishes', (docs) => {
                            console.log('After Delete ', docs);
                        });
                    });
                });
            });
        });
    });
});