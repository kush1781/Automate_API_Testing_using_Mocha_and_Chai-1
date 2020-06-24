import chai from "chai";
import {assert, expect, should} from "chai";
import chaiHttp from "chai-http";
import config from './config/config.json';

chai.use(should);
chai.use(chaiHttp);

var server = config.baseURI;
var delay = 3;

describe("GET-Delayed Request for API checking", function(){
    this.timeout(20000);

    it(`get list of users after ${delay} secs of delay` , (done)=>{

        chai.request(server)
            .get('/api/users?delay='+delay)
            .end((err,res)=>{
                if(!err)
                {
                    assert.equal(res.status,200);
                    
                    let body = res.body;
                    console.log(`Body recieved from the Response: \n`, JSON.stringify(body));
                   
                    assert.property(body,"page");
                    assert.hasAnyKeys(body,["page"]);
                    assert.hasAnyKeys(body,["page","total_pages"]);
                    assert.property(body.data[0],"first_name");
                }
                else
                {
                    console.log(err);
                }
                done();
            });
    });
});