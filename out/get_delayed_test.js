"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_2 = require("chai");
const chai_http_1 = __importDefault(require("chai-http"));
const config_json_1 = __importDefault(require("./config/config.json"));
chai_1.default.use(chai_2.should);
chai_1.default.use(chai_http_1.default);
var server = config_json_1.default.baseURI;
var delay = 3;
describe("GET-Delayed Request for API checking", function () {
    this.timeout(20000);
    it(`get list of users after ${delay} secs of delay`, (done) => {
        chai_1.default.request(server)
            .get('/api/users?delay=' + delay)
            .end((err, res) => {
            if (!err) {
                chai_2.assert.equal(res.status, 200);
                let body = res.body;
                console.log(`Body recieved from the Response: \n`, JSON.stringify(body));
                chai_2.assert.property(body, "page");
                chai_2.assert.hasAnyKeys(body, ["page"]);
                chai_2.assert.hasAnyKeys(body, ["page", "total_pages"]);
                chai_2.assert.property(body.data[0], "first_name");
            }
            else {
                console.log(err);
            }
            done();
        });
    });
});
