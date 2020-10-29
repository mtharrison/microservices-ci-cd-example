'use strict';

const Hapi = require('@hapi/hapi');

const Lights = require('./lights');


exports.start = async (api) => {

    const server = Hapi.server({
        port: process.env.PORT || 8000,
        routes: { cors: true }
    });

    server.route({
        method: 'GET',
        path: '/',
        options: { cors: true },
        handler: (request, h) => {

            return Lights.getLights(api);
        }
    });

    server.route({
        method: 'PATCH',
        path: '/{id}',
        options: { cors: true },
        handler: (request, h) => {

            const id = request.params.id;
            const { state } = request.payload;

            return Lights.setLightState(api, id, state);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
