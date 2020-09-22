const assert = require('assert');

exports.insertDocument = (db, coll, document, callback) => {
    const collection = db.collection(coll);
    collection.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log('Insert Document Successfull !!!', result.result.n);
        callback(result);
    })
}


exports.findDocument = (db, coll, callback) => {
    const collection = db.collection(coll);
    collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    }) 
}


exports.updateDocument = (db, coll, document, update, callback) => {
    const collection = db.collection(coll);
    collection.updateOne(document, {$set: update}, null, (err, result) => {
        assert.equal(err, null);
        callback(result);
    })
}

exports.deleteDocument = (db, coll, document, callback) => {
    const collection = db.collection(coll);
    collection.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        callback(result);
    })
}