# hapi-tiny-auth

[![Build Status](https://travis-ci.org/elnaz/hapi-tiny-auth.svg)](https://travis-ci.org/elnaz/hapi-tiny-auth)

Just enough authentication to make an API private. This [Hapi](http://hapijs.com/) plugin will allow only one set of configured credentials to access any of the API's endpoints. Must be used with [hapi-auth-basic](https://github.com/hapijs/hapi-auth-basic).

## Install

```bash
$ npm i hapi-tiny-auth --save
```

## Register

```js
const Hapi = require('hapi');

const server = new Hapi.Server();

server.register([
  require('hapi-auth-basic'),
  {
    register: require('hapi-tiny-auth'),
    options: {
      username: 'USERNAME', // required
      password: 'PASSWORD'  // required
    }
  }
], (err) => {

});
```
