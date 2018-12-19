/**
 * Created by developer on 12/16/18.
 */
const {createContext, CryptoFactory, Signer} = require('sawtooth-sdk/signing');
const secp256k1 = require('sawtooth-sdk/signing/secp256k1');
const crypto = require('crypto');
const protobuf = require('sawtooth-sdk/protobuf');
let BLOCKCHAIN_FAMILY_NAME = "expense-manager-dev";

module.exports = {
    createBytesArray: function (data) {
        let key = "7331b90f9e78ff6a11b4208c1ecea5611927bc872239fa5fcfad3466e4f28949";
        const context = createContext('secp256k1');
        const privateKey = secp256k1.Secp256k1PrivateKey.fromHex(key);
        const signer = new Signer(context, privateKey);
        const publicKey = signer.getPublicKey().asHex();
        let address = getEntityAddress(data.name, data.address, data.phone, 'person');

        const payloadBytes = Buffer.from(JSON.stringify(data));

        var transactionHeaderBytes = protobuf.TransactionHeader.encode({
            familyName: BLOCKCHAIN_FAMILY_NAME,
            familyVersion: '1.0',
            inputs: [address],
            outputs: [address],
            signerPublicKey: signer.getPublicKey().asHex(),
            batcherPublicKey: signer.getPublicKey().asHex(),
            dependencies: [],
            payloadSha512: crypto.createHash('sha512').update(payloadBytes).digest('hex')
        }).finish();

        const transactionHeaderSignature = signer.sign(transactionHeaderBytes);
        const transaction = protobuf.Transaction.create({
            header: transactionHeaderBytes,
            headerSignature: transactionHeaderSignature,
            payload: payloadBytes
        });


        // Create the BatchHeader
        const batchHeaderBytes = protobuf.BatchHeader.encode({
            signerPublicKey: publicKey,
            transactionIds: [transaction.headerSignature]
        }).finish();

        // Create the Batch
        const batchHeaderSignature = signer.sign(batchHeaderBytes);

        const batch = protobuf.Batch.create({
            header: batchHeaderBytes,
            headerSignature: batchHeaderSignature,
            transactions: [transaction]
        });

        // Encode the Batch in a BatchList
        return protobuf.BatchList.encode({
            batches: [batch]
        }).finish();
    }
}

function getAddress(key, length) {
    return crypto.createHash('sha512').update(key).digest('hex').slice(0, length)
}
function _hash(x) {
    return crypto.createHash('sha512').update(x).digest('hex').toLowerCase()
}
function nameSpace() {
    return _hash(BLOCKCHAIN_FAMILY_NAME).substring(0, 6);
}
function getEntityAddress(name, address, phone, entityName) {
    return nameSpace() + getAddress(entityName, 6) + getAddress(address, 8) + getAddress(phone, 24) + getAddress(name, 26);
}