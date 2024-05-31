const chai = require('chai');
const expect = chai.expect;
const app = require('../path/to/your/express/app'); // Thay đường dẫn này bằng đường dẫn thật sự đến file chứa express app của bạn
const request = require('supertest');

describe('Messenger API Tests', function() {
    it('should return the highest COSTAMOUNT in the data', function(done) {
        const userInput = "COSTAMOUNT cao thứ 1 trong data là";
        const requestData = { userInput };

        request(app)
            .post('/api/v1/messenger/chat')
            .send(requestData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.be.a('string');
                console.log("Response:", res.body);
                done();
            });
    });
});
