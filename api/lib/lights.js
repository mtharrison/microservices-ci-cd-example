'use strict';

exports.getLights = async (api) => {

    const roomsRes = await api.groups.getRooms();
    const lightsRes = await api.lights.getAll();

    const lights = lightsRes.reduce((acc, light) => {

        if (light.state.reachable !== true) {
            return acc;
        }

        acc[light.id] = {
            name: light.name,
            type: light.type,
            state: light.state
        };

        return acc;
    }, {});

    const rooms = roomsRes.reduce((acc, room) => {

        if (room.lights.length === 0) {
            return acc;
        }

        acc[room.name] = {
            name: room.name,
            lights: room.lights
        };

        return acc;
    }, {});

    return { rooms, lights };
};

exports.setLightState = async (api, id, state) => {

    await api.lights.setLightState(id, state);
    return api.lights.getLightState(id);
};
