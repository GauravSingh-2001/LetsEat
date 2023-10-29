const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://foodproject:0WPnMxqKfTzkoWj1@cluster0.quidojz.mongodb.net/?retryWrites=true&w=majority'
// const mongoURI = 'mongodb+srv://foodproject:0WPnMxqKfTzkoWj1@cluster0.quidojz.mongodb.net/?retryWrites=true&w=majority'
const mongoURI = 'mongodb+srv://foodproject:0WPnMxqKfTzkoWj1@cluster0.quidojz.mongodb.net/fooditems?retryWrites=true&w=majority'
const mongodb = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) {
            console.log("_ _ _", err)
        }
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("foods");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodcategory = await mongoose.connection.db.collection("foodcat");
                foodcategory.find({}).toArray(function (err, catdata){
                    if(err) console.log(err);
                else{
                    global.food_items = data;
                    global.foodcategory = catdata;
                    }
                })
                
            })
            
        }
    });
} 

module.exports = mongodb;