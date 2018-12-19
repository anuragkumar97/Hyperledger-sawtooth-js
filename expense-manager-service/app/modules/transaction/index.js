/**
 * Created by developer on 12/16/18.
 */
const Utils = require('../../utils');
const httpService = require('../../service/HTTPService');

module.exports = {

    submitTransaction : async function (req,res) {

        let bytesArray = Utils.createBytesArray(req.body);
       let response = await httpService.excuteHTTPRequest('post',"http://localhost:8008/",'batches',bytesArray,{'Content-Type': 'application/octet-stream'})
        res.send(response);

    }
}