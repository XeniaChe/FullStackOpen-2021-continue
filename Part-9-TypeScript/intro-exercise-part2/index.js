"use strict";
exports.__esModule = true;
var express = require("express");
var bmiCalculator_1 = require("./bmiCalculator");
var app = express();
var PORT = 3004;
app.listen(PORT, function () { return console.log("server is runninng on PORT: ".concat(PORT)); });
app.get('/bmi', function (req, res) {
    try {
        var _a = req.query, q1 = _a.height, q2 = _a.mass;
        if (typeof q1 !== 'string' || typeof q2 !== 'string') {
            throw new Error('Query params must be provided');
            // console.log('errorr!!!!!!!!!!!!');
        }
        else {
            console.log({ q1: q1 });
            console.log({ q2: q2 });
            var _b = (0, bmiCalculator_1.validateArgs)(q1, q2), height = _b.height, mass = _b.mass;
            var response = (0, bmiCalculator_1.calculateBmi)(height, mass);
            res.send(response);
        }
    }
    catch (error) {
        console.error(error);
        res.send("Error occured: ".concat(error.message));
    }
});
