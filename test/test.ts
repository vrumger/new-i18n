/* global describe it */

import * as assert from 'assert';
import I18n from '../src';

const languages = [`en`, `pt`];
const i18n = new I18n(`${__dirname}/localization`, languages);

describe(`new-i18n`, () => {
    it(`Should handle an object of languages`, () => {
        const languages = {
            en: {
                key: `value`,
            },
            pt: {
                key: `valor`,
            },
        };

        const i18n = new I18n(languages, `en`);
        assert.equal(i18n.translate(`en`, `key`), `value`);
        assert.equal(i18n.translate(`pt`, `key`), `valor`);
    });

    it(`Should throw an error if the language is not an object`, () => {
        const languages = {
            en: `invalid`,
        };

        const error = `Invalid language map: ${typeof languages.en}`;
        // @ts-expect-error
        assert.throws(() => new I18n(languages), Error, error);
    });

    it(`Should throw an error if the fallback wasn't listed as a language`, () => {
        const error = `The fallback language wasn't listed as a language.`;
        assert.throws(() => new I18n(``, [`en`], `pt`), Error, error);
    });

    it(`Should work with nested keys`, () => {
        assert.equal(i18n.translate(`en`, `nested.key`), `value`);
        assert.equal(i18n.translate(`en`, `nested.double_nested.key`), `value`);
    });

    it(`Should return \`null\` if there's no value`, () => {
        const keyword = `non_existent_key`;
        const nested = `nested.${keyword}`;
        const anotherNested = `${keyword}.${keyword}`;

        assert.equal(i18n.translate(`en`, keyword), null);
        assert.equal(i18n.translate(`en`, nested), null);
        assert.equal(i18n.translate(`en`, anotherNested), null);
    });

    it(`Should return \`null\` if there's no value in the fallback`, () => {
        const i18n = new I18n(`${__dirname}/localization`, languages, `pt`);
        const keyword = `non_existent_key`;
        const nested = `nested.${keyword}`;
        const anotherNested = `${keyword}.${keyword}`;

        assert.equal(i18n.translate(`en`, keyword), null);
        assert.equal(i18n.translate(`en`, nested), null);
        assert.equal(i18n.translate(`en`, anotherNested), null);
    });

    it(`Should fallback to the specified language`, () => {
        const i18n = new I18n(`${__dirname}/localization`, languages, `pt`);
        const keyword = `fallback`;
        const nested = `nested.${keyword}`;
        const doubleNested = `nested.double_nested.${keyword}`;

        assert.equal(i18n.translate(`en`, keyword), keyword);
        assert.equal(i18n.translate(`en`, nested), keyword);
        assert.equal(i18n.translate(`en`, doubleNested), keyword);
    });

    it(`Should fallback if the language doesn't exist`, () => {
        const i18n = new I18n(`${__dirname}/localization`, languages, `pt`);

        assert.equal(i18n.translate(`non-existent`, `fallback`), `fallback`);
    });

    it(`Shouldn't recurse forever while falling back`, () => {
        const i18n = new I18n(`${__dirname}/localization`, languages, `pt`);
        const keyword = `non_existent_key`;
        const nested = `nested.${keyword}`;
        const anotherNested = `${keyword}.${keyword}`;

        assert.equal(i18n.translate(`en`, keyword), null);
        assert.equal(i18n.translate(`en`, nested), null);
        assert.equal(i18n.translate(`en`, anotherNested), null);
    });

    const variableValue = `value`;

    it(`Should work with variables`, () => {
        const variable = {
            variable: variableValue,
        };

        assert.equal(i18n.translate(`en`, `with_variables`, variable), variableValue);
        assert.equal(i18n.translate(`en`, `nested.with_variables`, variable), variableValue);
    });

    it(`Should work with nullish variable`, () => {
        const variable = {
            variable: 0,
        };

        assert.equal(i18n.translate(`en`, `with_variables`, variable), `0`);
        assert.equal(i18n.translate(`en`, `nested.with_variables`, variable), `0`);
    });

    it(`Shouldn't replace unknown variables `, () => {
        const variable = {
            unknownVariable: variableValue,
        };

        assert.notEqual(i18n.translate(`en`, `with_variables`, variable), variableValue);
        assert.notEqual(i18n.translate(`en`, `nested.with_variables`, variable), variableValue);
    });

    it(`Should work with multiple variables`, () => {
        assert.equal(
            i18n.translate(`en`, `with_multiple_variables`, {
                variable1: variableValue,
                variable2: variableValue,
            }),
            `${variableValue} ${variableValue}`,
        );
    });

    it(`Should allow updating languages`, () => {
        i18n.update(`en`, {
            nested: {
                other: {
                    key: `value`,
                },
            },
        });

        assert.equal(i18n.translate(`en`, `nested.other.key`), `value`);
    });

    it(`Should validate argument types`, () => {
        // @ts-expect-error
        assert.throws(() => i18n.update(1), {
            name: `Error`,
            message: `Invalid language type: number`,
        });

        // @ts-expect-error
        assert.throws(() => i18n.update(``, 1), {
            name: `Error`,
            message: `Invalid values type: number`,
        });
    });

    it(`Should have a .languages property`, () => {
        assert.deepEqual(i18n.languages, languages);
    });

    it(`Should only show the languages for the current instance`, () => {
        const i18n1 = new I18n(`${__dirname}/localization`, [`en`]);
        assert.deepEqual(i18n1.languages, [`en`]);

        const i18n2 = new I18n(`${__dirname}/localization`, [`pt`]);
        assert.deepEqual(i18n2.languages, [`pt`]);
    });
});
