'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const Lights = require('../lib/lights');

const internals = {};


const { describe, it, beforeEach } = exports.lab = Lab.script();
const expect = Code.expect;


describe('lights-api', () => {

    let api;

    beforeEach(() => {

        const lights = [
            { id: 1, name: 'light1', type: 'Extended color light', state: { reachable: true } },
            { id: 2, name: 'light2', type: 'Extended color light', state: { reachable: false } },
            { id: 3, name: 'light3', type: 'Another light', state: { reachable: true } },
            { id: 4, name: 'a-light4', type: 'Extended color light', state: { reachable: true } },
            { id: 5, name: 'z-light5', type: 'Extended color light', state: { reachable: true } }
        ];

        api = {
            lights: {
                getAll: () => lights,
                getLightState: (id) => lights.find((light) => light.id === id).state,
                setLightState: (id, state) => {

                    Object.assign(lights.find((light) => light.id === id).state,  state);
                }
            }
        };
    });

    describe('getLights()', () => {

        it('returns a list of lights', async (flags) => {

            const lights = await Lights.getLights(api);

            expect(lights).to.equal([{
                id: 4,
                name: 'a-light4',
                type: 'Extended color light',
                state: { reachable: true }
            },
            {
                id: 1,
                name: 'light1',
                type: 'Extended color light',
                state: { reachable: true }
            },
            {
                id: 5,
                name: 'z-light5',
                type: 'Extended color light',
                state: { reachable: true }
            }]);
        });
    });

    describe('setLightState()', () => {

        it('sets a light state', async (flags) => {

            const state = await Lights.setLightState(api, 4, { prop: 'erty' });

            expect(state).to.equal({
                reachable: true,
                prop: 'erty'
            });
        });
    });
});
