# hapi-tiny-auth

[![Build Status](https://travis-ci.org/elnaz/hapi-tiny-auth.svg)](https://travis-ci.org/elnaz/hapi-tiny-auth)

Just enough authentication to make an API private. This [Hapi](http://hapijs.com/) plugin will allow only one set of configured credentials to access any of the API's endpoints.

## Install

```bash
$ npm i hapi-tiny-auth --save
```

## Register

```js
const Hapi = require('hapi');

const server = new Hapi.Server();

server.register([
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
