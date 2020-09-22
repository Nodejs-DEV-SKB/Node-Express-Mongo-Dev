const assert = require('assert');

exports.insertDocument = (db, coll, document, callback) => {
    const collection = db.collection(coll);
    return collection.insert(document);
};


exports.findDocument = (db, coll, callback) => {
    const collection = db.collection(coll);
    return collection.find({}).toArray(); 
};


exports.updateDocument = (db, coll, document, update, callback) => {
    const collection = db.collection(coll);
    return collection.updateOne(document, {$set: update}, null);
};

exports.deleteDocument = (db, coll, document, callback) => {
    const collection = db.collection(coll);
    return collection.deleteOne(document);
};