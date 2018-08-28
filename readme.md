# PLACES API

[![Dependency Status](https://david-dm.org/iticRodrigoMendez/places-api/status.svg)](https://david-dm.org/iticRodrigoMendez/places-api)

`Places-api` is REST API server implementation built on top `Node.js` and `Express.js` with `Mongoose.js` for `MongoDB` integration. Access control follows with `JWT`.


## Running project

## Manual

You need to have [Node.js](https://nodejs.org), [MongoDB](https://www.mongodb.com) and [Nodemon](https://www.npmjs.com/package/nodemon) installed.

### Installation

```sh
# Update Homebrew before installing all dependencies
npm install
```

### Create secret.js file in /config 

```sh
module.exports={
cloudinary:{
        api_key:YOUR_API_KEY,
        cloud_name:YOUR_CLOUD_NAME,
        api_secret:YOUR_API_SECRET
    },
    jwtSecret:YOUR_SECRET
}
```


### Run server

```sh
npm start
# alias for
nodemon bin/www
```

## Modules used

Some of non-standard modules used:

* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [nodemon](https://www.npmjs.com/package/nodemon)


## Author

Created and maintained by Rodrigo Méndez