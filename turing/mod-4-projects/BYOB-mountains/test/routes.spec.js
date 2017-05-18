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
  it('should alphabatize the mountains array by reduce by mountain range', () => {
    stubData.mountains[0].should.have.property('Range')
    stubData.mountains[0].Range.should.equal("Mahalangur Himalaya")
    const cleanMountainObject = cleanArray(stubData)
    Object.keys(cleanMountainObject).length.should.equal(3)

    const firstKey = Object.keys(cleanMountainObject)[0]
    cleanMountainObject[firstKey][0].should.have.property('range')
    cleanMountainObject[firstKey].should.have.length(3)
    console.log(cleanMountainObject);
  })


})
