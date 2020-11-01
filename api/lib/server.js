'use strict';

const Hapi = require('@hapi/hapi');
const Hoek = require('@hapi/hoek');
const Jwt = require('jsonwebtoken');
const Jwks = require('jwks-rsa');
const Util = require('util');


const Lights = require('./lights');


exports.start = async (api) => {

    const client = Jwks({ jwksUri: 'https://dev-jbom1tp8.eu.auth0.com/.well-known/jwks.json' });
    const getKey = (header, callback) => {
            
        client.getSigningKey(header.kid, function(err, key) {

            const signingKey = key.publicKey || key.rsaPublicKey;
            callback(null, signingKey);
        });
    };

    const jwtVerify = Util.promisify(Jwt.verify);

    const server = Hapi.server({
        port: process.env.PORT || 8000,
        host: '0.0.0.0',
        routes: { cors: true }
    });

    server.events.on('log', (event, tags) => {

        console.log(tags, event);
    });

    server.events.on('request', (request, event, tags) => {

        if (tags.error) {
            console.error(event.error);
            if (Hoek.reach(event.error, ['_hueError', 'payload'])) {
                console.error(event.error._hueError.payload.error);
            }
        }
    });


    // Fetch light state every 3 seconds

    let lightState;

    setInterval(async () => {

        lightState = await Lights.getLights(api);

    }, 3000);


    server.route({
        method: 'GET',
        path: '/',
        options: { cors: true },
        handler: async (request, h) => {

            const token = request.headers.authorization.split(' ')[1];
            const decoded = await jwtVerify(token, getKey);

            return lightState;
        }
    });

    server.route({
        method: 'PATCH',
        path: '/{id}',
        options: { cors: true },
        handler: async (request, h) => {

            const token = request.headers.authorization.split(' ')[1];
            const decoded = await jwtVerify(token, getKey);

            if (!decoded.permissions.includes('update:lights')) {
                throw new Error('Need permissions to update lights');
            }

            const id = request.params.id;
            const { state } = request.payload;

            return Lights.setLightState(api, id, state);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
