const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

// Connect to Mongodb
MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connected To Server !');

    // Insert Data
    const db = client.db(dbName);
    const collection = db.collection('dishes');
    collection.insertOne({"name":"Biriyani", "description": "Tasty"}, (err, res) => {
        assert.equal(err, null);
        console.log('After Insert', res.ops);

        // Execute query and find all data
        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            console.log('Data', docs);

            // Drop a collection
            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);
                client.close();
            });
        });
    });
});