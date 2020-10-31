'use strict';

const Hapi = require('@hapi/hapi');

const Lights = require('./lights');


exports.start = async (api) => {

    const server = Hapi.server({
        port: process.env.PORT || 8000,
        routes: { cors: true }
    });

    let lightData = Lights.getLights(api);

    setInterval(() => {

        lightData = Lights.getLights(api)
    }, 1000);

    server.route({
        method: 'GET',
        path: '/',
        options: { cors: true },
        handler: (request, h) => {

            return lightData;
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
