'use strict';

const Hapi = require('@hapi/hapi');
const Jwt = require('jsonwebtoken');
const Wreck = require('@hapi/wreck');

const Lights = require('./lights');


exports.start = async (api) => {

    const server = Hapi.server({
        port: process.env.PORT || 8000,
        host: '0.0.0.0',
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

            Jwt.verify(request.query.token, process.env.JWT_SECRET);

            return lightData;
        }
    });

    server.route({
        method: 'GET',
        path: '/login',
        options: { cors: true },
        handler: async (request, h) => {

            // Exchange access code for access token

            const code = request.query.code;
            const res = await Wreck.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${code}`, {
                headers: {
                    accept: 'application/json'
                },
                json: true
            });
            
            const { access_token } = res.payload;

            // Find out who the user is

            const { payload } = await Wreck.get('https://api.github.com/user', {
                headers: {
                    'User-Agent': 'Control Matt\'s Lights',
                    authorization: `token ${access_token}`
                },
                json: true
            });

            if (process.env.ALLOWED_USERS.split(',').includes(payload.login)) {
                const token = Jwt.sign({ user: payload.login }, process.env.JWT_SECRET);
                return { token };
            }

            return {};
        }
    });

    server.route({
        method: 'PATCH',
        path: '/{id}',
        options: { cors: true },
        handler: (request, h) => {

            Jwt.verify(request.query.token, process.env.JWT_SECRET);

            const id = request.params.id;
            const { state } = request.payload;

            return Lights.setLightState(api, id, state);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
