const request = require('supertest');
const server = require("./index.js"); 


describe('GET /user', function() {
  it('responds with json', function(done) {
    request(server)
      .get('/firstTest')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
    });
  });
});