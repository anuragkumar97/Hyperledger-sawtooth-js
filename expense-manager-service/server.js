/**
 * Created by developer on 12/16/18.
 */
const express = require('express');
const APP = express();
require('./routes')(APP);



APP.listen(4000);
console.log("app started on port ", 4000);