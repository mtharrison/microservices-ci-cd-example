'use strict';

const Hapi = require('@hapi/hapi');

const Lights = require('./lights');


exports.start = async (api) => {

    const server = Hapi.server({ port: process.env.PORT || 8000 });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return Lights.getLights(api);
        }
    });

    server.route({
        method: 'PATCH',
        path: '/{id}',
        handler: (request, h) => {

            const id = request.params.id;
            const { state } = request.payload;

            return Lights.setLightState(api, id, state);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
