/**
 * Created by developer on 12/16/18.
 */
const {TransactionProcessor} = require('sawtooth-sdk/processor');
const IntegerKeyHandler = require('./handler');
const transactionProcessor = new TransactionProcessor("tcp://localhost:4004");

transactionProcessor.addHandler(new IntegerKeyHandler());

transactionProcessor.start();