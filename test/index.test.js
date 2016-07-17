'use strict';

const Hapi = require('hapi');

const authHeader = (username, password) => {
  return `Basic ${new Buffer(`${username}:${password}`, 'utf8').toString('base64')}`;
};

const OPTIONS = {
  username: 'username',
  password: 'password'
};

describe('plugin', () => {

  const server = new Hapi.Server();

  server.connection({ port: 80 });
  server.register([
    require('hapi-auth-basic'),
    {
      register: require('../lib'),
      options: OPTIONS
    }
  ], () => {});
  server.route({
    method: 'GET',
    path: '/authentication_test',
    config: {
      handler: (request, reply) => {
        reply('welcome');
      }
    }
  });

  it('accepts the valid username and password', () => {
    return server.inject({
      method: 'GET',
      url: '/authentication_test',
      headers: {
        authorization: authHeader('username', 'password')
      }
    })
    .then((response) => {
      expect(response.statusCode).to.eql(200);
    });
  });

  it('rejects invalid usernames', () => {
    return server.inject({
      method: 'GET',
      url: '/authentication_test',
      headers: {
        authorization: authHeader('foo', 'password')
      }
    })
    .then((response) => {
      expect(response.statusCode).to.eql(401);
    });
  });

  it('rejects invalid passwords', () => {
    return server.inject({
      method: 'GET',
      url: '/authentication_test',
      headers: {
        authorization: authHeader('username', 'foo')
      }
    })
    .then((response) => {
      expect(response.statusCode).to.eql(401);
    });
  });

  it('rejects invalid plugin options', () => {
    const badServer = new Hapi.Server();

    badServer.connection({ port: 8080 });
    badServer.register([
      require('hapi-auth-basic'),
      {
        register: require('../lib'),
        options: {
          username: '',
          password: ''
        }
      }
    ], (err) => {
      expect(err).to.be.instanceof(Error);
    });
  });

});
