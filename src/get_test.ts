// https://reqres.in
// i have Implemented 1st 3 GET methods in this file


import chai from "chai";
import {assert, expect, should} from "chai";
import chaiHttp from "chai-http";
import config from './config/config.json';

chai.use(should);
chai.use(chaiHttp);

var server : string;
var page = 2;
var userId = 2;

describe("GET Request for API checking", function(){
    this.timeout(20000);

    // done() is called after all async tests and hooks
    before((done)=>{
        server = config.baseURI;
        done();
    });

    // get list of users for page
    it("get list of users for page "+page, (done)=>{

        chai.request(server)
            .get('/api/users?page='+page)
            .end((err,res)=>{
                if(!err)
                {
                    // to know the response's status
                    // 200 means OK
                    assert.equal(res.status,200);
                    
                    let body = res.body;
                    //console.log(typeof(body));
                    //console.log(body);
                    console.log(`Body recieved from the Response: \n`, JSON.stringify(body));
                    //console.log(body.page);
                    
                    // below two lines means same
                    assert.property(body,"page");
                    assert.hasAnyKeys(body,["page"]);
                    assert.hasAnyKeys(body,["page","total_pages"]);
                    assert.equal(body.page,page);

                    // above things by using should
                    body.should.have.property("page").be.equal(page);

                    assert.property(body.data[0],"first_name");
                }
                else
                {
                    console.log(err);
                    throw{message:"There is some error in requesting or getting the URI"}
                }
                done();
            });
    });

    // get Single user details
    it("get Single user details", (done)=>{

        chai.request(server)
            .get("/api/users/"+userId)
            .end((err,res)=>{
                
                if(!err)
                {
                    let body = res.body;
                    console.log(`Body recieved from the Response:  `, JSON.stringify(body));
                    if(res.status==404)
                    {
                        console.log(`User with User Id: ${userId} not found`)
                    }
                    else
                    {
                        assert.equal(res.status,200);
                        
                        // check if have id as property, if have then check if its value is equal to userId
                        assert.property(body.data,"id");
                        assert.equal(body.data.id,userId);
                    }
                }
                else
                {
                    console.log(err);
                    throw{message:"There is some error in requesting or getting the URI"}
                }
                done();
            });
    });
});