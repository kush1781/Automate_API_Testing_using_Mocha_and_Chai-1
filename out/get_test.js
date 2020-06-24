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
var server;
var page = 2;
var userId = 2;
describe("GET Request for API checking", function () {
    this.timeout(20000);
    before((done) => {
        server = config_json_1.default.baseURI;
        done();
    });
    it("get list of users for page " + page, (done) => {
        chai_1.default.request(server)
            .get('/api/users?page=' + page)
            .end((err, res) => {
            if (!err) {
                chai_2.assert.equal(res.status, 200);
                let body = res.body;
                console.log(`Body recieved from the Response: \n`, JSON.stringify(body));
                chai_2.assert.property(body, "page");
                chai_2.assert.hasAnyKeys(body, ["page"]);
                chai_2.assert.hasAnyKeys(body, ["page", "total_pages"]);
                chai_2.assert.equal(body.page, page);
                body.should.have.property("page").be.equal(page);
                chai_2.assert.property(body.data[0], "first_name");
            }
            else {
                console.log(err);
                throw { message: "There is some error in requesting or getting the URI" };
            }
            done();
        });
    });
    it("get Single user details", (done) => {
        chai_1.default.request(server)
            .get("/api/users/" + userId)
            .end((err, res) => {
            if (!err) {
                let body = res.body;
                console.log(`Body recieved from the Response:  `, JSON.stringify(body));
                if (res.status == 404) {
                    console.log(`User with User Id: ${userId} not found`);
                }
                else {
                    chai_2.assert.equal(res.status, 200);
                    chai_2.assert.property(body.data, "id");
                    chai_2.assert.equal(body.data.id, userId);
                }
            }
            else {
                console.log(err);
                throw { message: "There is some error in requesting or getting the URI" };
            }
            done();
        });
    });
});
