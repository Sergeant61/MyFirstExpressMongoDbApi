const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

const server = require("../../app");

chai.use(chaiHttp);
let token;

describe("/api/movies tests", () => {
  before(done => {
    chai
      .request(server)
      .post("/authenticate")
      .send({ username: "recep", password: "12345" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe("/GET movies", () => {
    it("it shoul GET all the movies", done => {
      chai
        .request(server)
        .get("/api/movies")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST movie", () => {
    it("it should POST a movie", done => {
      const movie = {
        title: "Udemy123",
        director_id: "5e64fbbb6963585be0f03f9e",
        category: "Komedi",
        country: "Türkiye",
        year: 1950,
        imdb_score: 8
      };

      chai
        .request(server)
        .post("/api/movies")
        .send(movie)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          done();
        });
    });
  });


});
