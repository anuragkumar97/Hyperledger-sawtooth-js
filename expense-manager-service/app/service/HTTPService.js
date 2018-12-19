/**
 * Created by developer on 12/16/18.
 */
const request = require("request");

class HTTPService {
    /**
     * execute Http request
     */
    static async excuteHTTPRequest(method, hostname, path, data, headers) {
        return await new Promise(function (fulfill, reject) {
            request({
                url: hostname + path,
                method: method,
                headers: headers,
                body: data
            }, function (error, response, body) {
                // console.log('body:-', body);
                if (error) {
                    // console.log("err" + error);
                    reject(error);
                } else {
                    fulfill(body);
                }
            });
        });
    }
}

module.exports = HTTPService;