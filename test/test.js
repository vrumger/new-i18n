/* global describe it */

const assert = require(`assert`);

const newI18n = require(`..`);
const languages = [`en`, `pt`];
const i18n = newI18n(`${__dirname}/localization`, languages);

describe(`new-i18n`, () => {
    it(`Should return the keyword if there's no value`, () => {
        const keyword = `non_existent_key`;
        const nested = `nested.${keyword}`;

        assert.equal(i18n(`en`, keyword), keyword);
        assert.equal(i18n(`en`, nested), nested);
    });

    const variableValue = `value`;

    it(`Should work with variables`, () => {
        const variable = {
            variable: variableValue,
        };

        assert.equal(
            i18n(`en`, `with_variables`, variable),
            variableValue
        );

        assert.equal(
            i18n(`en`, `nested.with_variables`, variable),
            variableValue
        );
    });

    it(`Shouldn't replace unknown variables `, () => {
        const variable = {
            unknown_variable: variableValue,
        };

        assert.notEqual(
            i18n(`en`, `with_variables`, variable),
            variableValue
        );

        assert.notEqual(
            i18n(`en`, `nested.with_variables`, variable),
            variableValue
        );
    });

    it(`Should work with multiple variables`, () => {
        assert.equal(
            i18n(`en`, `with_multiple_variables`, {
                variable1: variableValue,
                variable2: variableValue,
            }),
            `${variableValue} ${variableValue}`
        );
    });

    it(`Should have a .languages property`, () => {
        assert.deepEqual(i18n.languages, languages);
    });
});
