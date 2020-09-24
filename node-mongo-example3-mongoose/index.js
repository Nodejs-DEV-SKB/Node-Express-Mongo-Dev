const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to DB Successfully');
    
    // Save Dish to db
    Dishes.create({
        name: "Pizza2",
        description: "Fantastic"
    })
    .then((dish) => {
        console.log('Just Saved Dish Is ', dish);
        // Update Dish
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: "Updated Dish"}
        },
            {new: true}
        );
    })
    .then((dish) => {
        console.log('After Updating Dish is', dish);
        // Add Comment to Dish
        dish.comments.push({
            rating: 4,
            comment: "Fantastic",
            author: "Shakib"
        });
        return dish.save();
    })
    .then((dish) => {
        console.log('After Adding Comment', dish);
        return Dishes.remove({});
    })
    .then((dishs) => {
        console.log('Removed Collection', dishs);
        return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});