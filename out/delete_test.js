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
var userId = 2;
describe("DELETE Request for API Checking", function () {
    this.timeout(10000);
    it("Delete Request to delete", (done) => {
        chai_1.default.request(server)
            .delete("/api/users/" + userId)
            .end((err, res) => {
            if (!err) {
                chai_2.assert.equal(res.status, 204);
            }
            else {
                console.log(err);
            }
            done();
        });
    });
});
