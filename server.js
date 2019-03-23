const
	dotenv = require('dotenv').load(),
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	mongojs = require("mongojs"),
	csv = require('csvtojson'),
	MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/wage-visualizer',
	PORT = process.env.PORT || 3001,
	usersRoutes = require('./routes/users.js')

mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
	res.json({message: "API root."})
})

app.use('/api/users', usersRoutes)

app.use('*', (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`)
})

var databaseUrl = "project3";
var collections = ["project3data"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

db.project3data.remove({});

var csvFilePath = './csv/wage file.csv'
csv()
    .fromFile(csvFilePath)
    .then(function (data) {
        for (i = 0; i < data.length; i++) {
            db.project3data.save({
                Country: data[i].Country,
                Province: data[i].Province,
                City: data[i].City,
                Job_Title: data[i].Job_Title,
                Low_Salary_Yearly: data[i].Low_Salary_Yearly,
                Median_Salary_Yearly: data[i].Median_Salary_Yearly,
                Max_Salary_Yearly: data[i].Max_Salary_Yearly,
                Currency: data[i].Currency,
                Year: data[i].Year,
                Cost_of_Living_Yearly: data[i].Cost_of_Living_Yearly
            }, function (err, inserted) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(inserted);
                }
            });
        }
    })


function getMin(inputA, inputB) {
    app.get("/api/min", function (req, res) {
        db.project3data.find(
            { City: inputA, Job_Title: inputB },
            {
                Low_Salary_Yearly: 1,
                _id: 0
            }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        )
    })
};

function getMax(inputA, inputB) {
    app.get("/api/max", function (req, res) {
        db.project3data.find(
            { City: inputA, Job_Title: inputB },
            {
                Max_Salary_Yearly: 1,
                _id: 0
            }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        )
    })
};

function getMed(inputA, inputB) {
    app.get("/api/med", function (req, res) {
        db.project3data.find(
            { City: inputA, Job_Title: inputB },
            {
                Median_Salary_Yearly: 1,
                _id: 0
            }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        )
    })
};

function getCost(inputA, inputB) {
    app.get("/api/cost", function (req, res) {
        db.project3data.find(
            { City: inputA, Job_Title: inputB },
            {
                Cost_of_Living_Yearly: 1,
                _id: 0
            }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            }
        )
    })
};

var city = 'toronto';
var job = 'web developer';
console.log(city ,'min salary');
getMin(city, job);
console.log(city ,'max salary');
getMax(city,job);
console.log(city ,'medium salary');
getMed(city, job);
console.log(city ,'cost of living');
getCost(city, job);

app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})
