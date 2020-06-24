import chai from "chai";
import {assert, expect, should} from "chai";
import chaiHttp from "chai-http"
import config from "./config/config.json";
import putBody from "./data/body.json";

chai.use(should);
chai.use(chaiHttp);

var server = config.baseURI;
var userId = 2;

describe("PUT Request for API Checking", function(){
    this.timeout(40000);

    it("Put request to Update",(done)=>{
        
        console.log(putBody.Update);
        console.log();

        chai.request(server)
            .put("/api/users/"+userId)
            .set("Content-Type","application/json")
            .send(putBody.Update)
            .end((err,res)=>{
                
                if(!err)
                {
                    let body = res.body;
                    console.log(`Body recieved from the Response: \n`, JSON.stringify(body));

                    assert.equal(res.status,200);
                }
                else
                {
                    console.log(err);
                }
                done();
            });
    });
})
