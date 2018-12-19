/**
 * Created by developer on 12/16/18.
 */
const {createContext, CryptoFactory, Signer} = require('sawtooth-sdk/signing');
const secp256k1 = require('sawtooth-sdk/signing/secp256k1');
const crypto = require('crypto');
const protobuf = require('sawtooth-sdk/protobuf');
let BLOCKCHAIN_FAMILY_NAME = "expense-manager-dev";

module.exports = {
    nameSpace,
    getEntityAddress
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