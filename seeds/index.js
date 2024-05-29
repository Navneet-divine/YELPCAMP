const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp')
.then(() => {
    console.log("CONNECTION OPEN")
}).catch(() => {
    console.log("CONNECTION ERROR!!")
})


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:"66505c5e170b989feca801f8",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images:[
                {
                  url: 'https://res.cloudinary.com/dbtrgjyvz/image/upload/v1716831112/YelpCamp/iq8i94pw6ysg3by2vm2k.jpg',
                  filename: 'YelpCamp/iq8i94pw6ysg3by2vm2k',
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})