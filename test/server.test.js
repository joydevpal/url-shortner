const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const UrlShorten = require("../models/UrlShorten");
const generateId = require("../utils");
var should = chai.should();
chai.use(chaiHttp);

describe('Testing URL Shortener API', function () {
    it('should list all URLs on /get-stats GET', function (done) {
        chai.request(server)
            .get('/api/getStats')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.an('array');
                done();
            });
    });

    it('should get a single URL on /:id GET', function (done) {
        const reqObj = {
            urlCode: generateId(5),
            count: 0,
            ipAddress: [],
            country: [],
            originalUrl: 'https://www.google.com'
        };
        reqObj.shortUrl = "http://localhost:3000/" + reqObj.urlCode;
        const newURL = new UrlShorten(reqObj);
        newURL.save(function (err, data) {
            chai.request(server)
                .get('/' + data.urlCode)
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    it('should add a URL on /api/createShortenUrl POST', function (done) {
        const urlObj = {
            shortBaseUrl: "http://localhost:3000",
            originalUrl: 'https://www.google.com',
            count: 0,
            ipAddress: [],
            country: []
        };
        chai.request(server)
            .post('/api/createShortenUrl')
            .send(urlObj)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                done();
            });
    });

    it('should update a URL on /api/updateStats POST', function (done) {
        chai.request(server)
            .get('/api/getStats')
            .end(function (err, res) {
                chai.request(server)
                    .post('/api/updateStats')
                    .send({
                        "count": 1,
                        "ipAddress": "47.11.153.187",
                        "country": "India",
                        "urlCode": res.body[0].urlCode
                    })
                    .end(function (error, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.an('object');
                        response.body.should.have.property('message');
                        done();
                    });
            });
    });
});