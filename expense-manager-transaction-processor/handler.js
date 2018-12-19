/**
 * Created by developer on 12/16/18.
 */
const {TransactionHandler} = require('sawtooth-sdk/processor/handler');
const {InvalidTransaction, InternalError} = require('sawtooth-sdk/processor/exceptions');
const Utils = require('./app/utils');

class IntegerKeyHandler extends TransactionHandler {
    constructor() {
        super("expense-manager-dev", ['1.0'], [Utils.nameSpace()])
    }


    apply(transactionProcessRequest, context) {
        const header = transactionProcessRequest.header;
        const signer = header.signerPublicKey;

        const data = JSON.parse(transactionProcessRequest.payload);
        const address = Utils.getEntityAddress(data.name, data.address, data.phone,"person");

        return context.setState({
            [address]: Buffer.from(JSON.stringify({person: data})).toString('base64')
        });
    } 
}
module.exports = IntegerKeyHandler;