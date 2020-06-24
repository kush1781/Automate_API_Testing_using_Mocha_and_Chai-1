import chai from "chai";
import {assert, expect, should} from "chai";
import chaiHttp from "chai-http";
import config from "./config/config.json";
import postBody from "./data/body.json";

chai.use(should);
chai.use(chaiHttp);

var server : string;

describe("POST Request for API Checking", function(){
    this.timeout(40000);

    before((done)=>{
        server = config.baseURI;
        done();
    })


    // this it() is for Create Post Request 
    it("Post request to Create", (done)=>{

        console.log(postBody.Create);
        console.log();

        chai.request(server)
            .post("/api/users")
            .set("Content-Type","application/json")
            .send(postBody.Create)
            .end((err,res)=>{

                if(!err)
                {
                    let body = res.body;
                    console.log(`Body recieved from the Response: \n`, JSON.stringify(body));
                    console.log();

                    assert.equal(res.status,201);
                    assert.property(body,"id");
                    // Below line is giving error as on every second the id is changing in the api 
                    // realize the above thing by refreshing page again and again
                    //assert.equal(body.id,"763");
                }
                else
                {
                    console.log(err);
                }
                done();
            });
    });


    // This it() is for Register Put Request 
    it("Post request for Register", (done)=>{

        console.log(postBody.Register);
        console.log();

        chai.request(server)
            .post("/api/register")
            .set("Content-Type", "application/json")
            // Please see its use then only uncomment it
            //.set("cache-control", "no-cache")
            .send(postBody.Register)
            .end((err,res)=>{

                if(!err)
                {
                    var body=res.body;
                    //console.log(body);
                    console.log(`Body recieved from the Response: \n`, JSON.stringify(body));
                    console.log();
                    
                    assert.equal(res.status,200);
                }
                else
                {
                    console.log(err);
                }
                done();
            });
    });
});
