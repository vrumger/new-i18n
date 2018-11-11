`use strict`;

const languages = {};

module.exports = (folder, langs = []) => {
    langs.forEach(lang => (languages[lang] = require(`${folder}/${lang}.json`)));

    const i18n = function (lang, keyword, variables = {}) {
        if (!languages[lang]) {
            return keyword;
        }

        const value = keyword
            .split(`.`)
            .reduce(
                (res, key) => res && res[key],
                languages[lang]
            );

        return !value ? keyword : value.replace(
            /\{{2}(.+?)\}{2}/g,
            (_, variable) => variables[variable] || variable
        );
    };

    i18n.languages = Object.keys(languages);
    return i18n;
};
