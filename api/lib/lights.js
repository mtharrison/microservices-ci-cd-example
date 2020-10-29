'use strict';

exports.getLights = async (api) => {

    const lights = await api.lights.getAll();

    const res = lights.map((light) => ({
        id: light.id,
        name: light.name,
        type: light.type,
        state: light.state
    })).filter((light) => {

        return light.type === 'Extended color light' && light.state.reachable === true;
    }).sort((a, b) => {

        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });

    return res;
};

exports.setLightState = async (api, id, state) => {

    await api.lights.setLightState(id, state);
    return api.lights.getLightState(id);
};
