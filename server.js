const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const courseRoutes = express.Router();
let Course = require('./coursemodel');
const keys=require("./config/keys");

const MONGODB_URI =
 //  keys.mongoURI;
 "mongodb+srv://Vijit:VLQ7hiDd.USGZtF@cluster0-4mx9y.mongodb.net/test?retryWrites=true";


app.use(cors());
app.use(bodyParser.json());

courseRoutes.route('/').get(function(req, res) {
    Course.find(function(err, courses) {
        if (err) {
            console.log(err);
        } else {
            res.json(courses);
        }
    });
});

courseRoutes.route('/add').post(function(req, res) {
    let course = new Course(req.body);
    course.save()
        .then(todo => {
            res.status(200).json({'course': 'course added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new course failed');
        });
});


app.use('/course', courseRoutes);




if(process.env.NODE_ENV === 'production')
{
    //Express serves prod asstes like main.css and main.js 
    app.use(express.static('client/build'));

    //Express serves index.html for internal routes (Router)
    const path = require('path');
    app.get
    ('*', (req,res) =>  {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    });

}


const PORT = process.env.PORT ||  4000;

mongoose
  .connect(process.env.MONGODB_URI ||  "mongodb+srv://Vijit:VLQ7hiDd.USGZtF@cluster0-4mx9y.mongodb.net/test?retryWrites=true" ,{ useNewUrlParser: true })
  .then(result => {
    app.listen(PORT, function() {
        console.log("Server is running on Port: " + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });

