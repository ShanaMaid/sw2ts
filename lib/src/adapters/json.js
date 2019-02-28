"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var out_1 = require("../utils/out");
var json2ts_1 = require("../utils/json2ts");
var filter_1 = require("../utils/filter");
var parse = function (json) {
    var interfaces = [];
    Object.keys(json).forEach(function (method) {
        var apis = json[method];
        for (var api in apis) {
            if (apis.hasOwnProperty(api)) {
                var el = apis[api];
                var pathName = "" + method.toUpperCase() + api;
                var content = typeof el === 'function' ? el() : el;
                content = json2ts_1.default(content);
                var temp = {
                    fileName: pathName + ".ts",
                    method: method,
                    path: api,
                    content: content,
                };
                interfaces.push(temp);
            }
        }
    });
    return interfaces;
};
exports.default = (function (json, dir, blackList) {
    var result = parse(json);
    if (blackList) {
        result = filter_1.default(blackList, result);
    }
    out_1.default(result, dir);
});
//# sourceMappingURL=json.js.map