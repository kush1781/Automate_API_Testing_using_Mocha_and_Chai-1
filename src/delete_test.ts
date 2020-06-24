import chai from "chai";
import {assert, expect, should} from "chai";
import chaiHttp from "chai-http";
import config from "./config/config.json";

chai.use(should);
chai.use(chaiHttp);

var server=config.baseURI;
var userId=2;

describe("DELETE Request for API Checking", function(){
    this.timeout(10000);

    it("Delete Request to delete", (done)=>{

        chai.request(server)
            .delete("/api/users/"+userId)
            .end((err,res)=>{

                if(!err)
                {
                    assert.equal(res.status,204);
                }
                else
                {
                    console.log(err);
                }
                done();
            });
    });
});