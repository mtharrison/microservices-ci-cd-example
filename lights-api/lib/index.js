'use strict';

const HueV3 = require('node-hue-api').v3;
const Server = require('./server');

const main = async () => {

    const remoteBootstrap = HueV3.api.createRemote(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    const api = await remoteBootstrap.connectWithTokens(process.env.ACCESS_TOKEN, process.env.REFRESH_TOKEN, process.env.HUE_USERNAME);

    await Server.start(api);
};

main();
