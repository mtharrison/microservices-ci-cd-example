'use strict';

exports.getLights = async (api) => {

    const roomsRes = await api.groups.getRooms();
    const lightsRes = await api.lights.getAll();

    const lights = lightsRes.map((light) => ({
        id: light.id,
        name: light.name,
        type: light.type,
        state: light.state
    })).filter((light) => {

        return light.type === 'Extended color light' && light.state.reachable === true;
    }).sort((a, b) => {

        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });

    const rooms = roomsRes.reduce((acc, curr) => {

        const roomLights = lights.filter(({ id }) => curr.lights.includes(String(id)));

        if (roomLights.length === 0) {
            return acc;
        }

        acc[curr.name] = {
            name: curr.name,
            lights: roomLights
        };

        return acc;
    }, {});

    return rooms;
};

exports.setLightState = async (api, id, state) => {

    await api.lights.setLightState(id, state);
    return api.lights.getLightState(id);
};
