'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const internals = {};


const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;


describe('lights-api', () => {

    describe('api', () => {

        it('does something', (flags) => {

            expect(1 + 1).to.equal(2);
        });
    });
});
