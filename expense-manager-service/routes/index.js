/**
 * Created by developer on 12/16/18.
 */
const bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const express = require('express');

const Transaction = require('../app/modules/transaction');


module.exports = function (APP) {

    APP.use(expressValidator());
    APP.use(bodyParser.urlencoded({ extended: false }));
    APP.use(bodyParser.json());



    APP.get("/", (req, res) => {
        res.send('it is working fine');
    });

    APP.post('/submit-transaction', Transaction.submitTransaction);
}