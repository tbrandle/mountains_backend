process.env.NODE_ENV = 'test';

const stubData = require('./stub.json')
const cleanArray = require('../helpers/data_cleaner.js')

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server');

const configuration = require('../knexfile').test;
const database = require('knex')(configuration);

chai.use(chaiHttp);


describe('test data_cleaner functions', () => {
  it('should alphabatize the mountains array by mountain range', () => {
    stubData[0].should.have.property('Range')
    stubData[0].Range.should.equal("Mahalangur Himalaya")
    const cleanMountainArray = cleanArray(stubData)
    cleanMountainArray.length.should.equal(5)
    cleanMountainArray[0].should.have.property('range')
    cleanMountainArray[0].range.should.equal('Baltoro Karakoram')
  })
})
