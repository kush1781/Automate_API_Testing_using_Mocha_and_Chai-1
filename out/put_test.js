"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_2 = require("chai");
const chai_http_1 = __importDefault(require("chai-http"));
const config_json_1 = __importDefault(require("./config/config.json"));
const body_json_1 = __importDefault(require("./data/body.json"));
chai_1.default.use(chai_2.should);
chai_1.default.use(chai_http_1.default);
var server = config_json_1.default.baseURI;
var userId = 2;
describe("PUT Request for API Checking", function () {
    this.timeout(40000);
    it("Put request to Update", (done) => {
        console.log(body_json_1.default.Update);
        console.log();
        chai_1.default.request(server)
            .put("/api/users/" + userId)
            .set("Content-Type", "application/json")
            .send(body_json_1.default.Update)
            .end((err, res) => {
            if (!err) {
                let body = res.body;
                console.log(`Body recieved from the Response: \n`, JSON.stringify(body));
                chai_2.assert.equal(res.status, 200);
            }
            else {
                console.log(err);
            }
            done();
        });
    });
});
