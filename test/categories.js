process.env.NODE_ENV = 'test';
const shell = require('shelljs');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Get, Create categories and products', () => {

  before((done) => {
    shell.exec('sh ./test/bash/before.sh', (data) => {
      done();
    });
  });

  describe('GET /categories', () => {
    it('Should get correct response for /categories', (done) => {
      chai.request(server)
        .get('/categories')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body[0].id.should.be.equal(1);
          res.body[0].name.should.be.equal('Phones');
          res.body[0].products_count.should.be.equal(2);
          res.body.should.have.length(1);
          done();
        });
    });
  });

  describe('POST /categories', () => {
    it('Should create new category', (done) => {
      chai.request(server)
        .post('/categories')
        .send({
          name: 'Candy'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.name.should.be.equal('Candy');
          res.body.products_count.should.be.equal(0);
          done();
        });
    });
  });

  describe('POST /categories', () => {
    it('Should restrict to create new category', (done) => {
      chai.request(server)
        .post('/categories')
        .send({
          name: ''
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.errors.name[0].should.be.equal("can't be blank");
          done();
        });
    });
  });

  describe('POST /categories', () => {
    it('Should restrict to create new category', (done) => {
      chai.request(server)
        .post('/categories')
        .send({
          name: 'Phones'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.errors.name[0].should.be.equal('category already exists');
          done();
        });
    });
  });

  describe('GET /categories/1/products', () => {
    it('Should get products by category id', (done) => {
      chai.request(server)
        .get('/categories/1/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.should.have.length(2);
          res.body[0].id.should.be.equal(1);
          res.body[0].name.should.be.equal('Galaxy');
          res.body[0].price.should.be.equal(1000.45);
          done();
        });
    });
  });

  describe('POST /categories/1/products', () => {
    it('Should create new product', (done) => {
      chai.request(server)
        .post('/categories/1/products')
        .send({
          name: 'Shoes',
          price: 490.13
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.name.should.be.equal('Shoes');
          done();
        });
    });
  });

  describe('POST /categories/1/products', () => {
    it('Should restrict to create new product', (done) => {
      chai.request(server)
        .post('/categories/1/products')
        .send({
          name: '',
          price: 490.13
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.errors.name[0].should.be.equal("can't be blank");
          done();
        });
    });
  });

  describe('POST /categories/1/products', () => {
    it('Should restrict to create new product', (done) => {
      chai.request(server)
        .post('/categories/1/products')
        .send({
          name: 'Shoes',
          price: ''
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.errors.price[0].should.be.equal("can't be blank");
          done();
        });
    });
  });

  describe('POST /categories/1/products', () => {
    it('Should restrict to create new product', (done) => {
      chai.request(server)
        .post('/categories/1/products')
        .send({
          name: 'Shoes',
          price: 0
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.errors.price[0].should.be.equal("price must be greater then 0");
          done();
        });
    });
  });

  describe('POST /categories/1/products', () => {
    it('Should restrict to create new product', (done) => {
      chai.request(server)
        .post('/categories/1/products')
        .send({
          name: 'iPhone',
          price: 1000
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.errors.name[0].should.be.equal("product already exists");
          done();
        });
    });
  });

  describe('DELETE /products/2', () => {
    it('Should delete product by id', (done) => {
      chai.request(server)
        .delete('/products/2')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });

  describe('DELETE /products/9999', () => {
    it('Should restrict to delete non existing product by id', (done) => {
      chai.request(server)
        .delete('/products/9999')
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });

  after(function() {
    shell.exec('sh ./test/bash/after.sh', (data) => {
      process.exit(0);
    });
  });
});
