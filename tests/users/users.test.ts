import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';

let firstUserIdTest = '';
const firstUserBody = {
  email: `marcos.henrique+${shortid.generate()}@toptal.com`,
  password: 'Sup3rSecret!23',
};

describe('users and auth endpoints', function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });
  after(function (done) {
    // shut down the Express.js server,  then tell Mocha we're done:
    app.close(done);
  });

  it('should allow a POST to /users', async function () {
    const res = await request.post('/users').send(firstUserBody);

    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.an('string');
    firstUserIdTest = res.body.id;
  });

  it('should allow a GET from /users/:userId', async function () {
    const res = await request.get(`/users/${firstUserIdTest}`).send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');
    expect(res.body.id).to.equal(firstUserIdTest);
    expect(res.body.email).to.equal(firstUserBody.email);
  });
});
