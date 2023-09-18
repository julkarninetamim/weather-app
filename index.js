const express = require('express')//Node JS ব্যবহার করে যখন import,export করতে হয় তখন const ভ্যারিয়বলে store করতে হয় এবং
// require() function এর মধ্যে করতে হয়
const app = express()//এখানে express কে call করলে এটি app হয়ে যাবে।

const cors = require('cors')//cors origin API নিয়ে যেন problem না ফেস করতে হয়।
const bodyParser = require('body-parser')// frontend থেকে JSON আকারে  যে data টি ক্লায়েন্টের server এ যে ডাটা পাঠাবো সে ডাটাটি
// যেন body আকারে নিতে পারে। একে মূলতঃ middleware বলে express js এ
const path = require('path');
const mongoose = require("mongoose");
// এটি একটি ORM, এটি MongoDB database ব্যবহার করার জ্ন্য  সাহায্য করবে।
const database = module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect('mongodb+srv://mongodbuser:mongodbpass@cluster0.b37aqz0.mongodb.net/weather_db?retryWrites=true&w=majority',
            connectionParams)
        console.log('Database connect successfully')
    } catch (error) {
        console.log('Database connection failed')
    }
}

app.use(cors())//cors টাকে remove  করা হল
app.use(express.static('public'))//নির্দিষ্ট folder কে static বানানো হল
app.use(bodyParser.urlencoded({extended: false}))//bodyparser এর সাথে urlecncoded এর ডাটাগুলোকে নেয়ার সিস্টেম তৈরি
app.use(bodyParser.json())////bodyparser এর সাথে json এর ডাটাগুলোকে নেয়ার সিস্টেম তৈরি
app.use('/api/history', require('./api/route'))

/*app.get('/', (req, res) => {// App টি running আছে কিনা তা জানার জন্য একটি route তৈরি করি
    res.send('<h1>Hello I am a Node Server Running on PORT 444</h1>')
})*/

const PORT = process.env.PORT || 4444//এটি সার্ভারে নির্দিষ্ট PORT এ রান করবে।
app.listen(PORT, () => {//একটি নির্দিষ্ট PORT এ listen করতে হবে।
    console.log('APP is Running on PORT' + PORT)
    database()

})


