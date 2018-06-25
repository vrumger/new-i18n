`use strict`;

const languages = {};

module.exports = (folder, langs = []) => {
    langs.forEach(lang => (languages[lang] = require(`${folder}/${lang}.json`)));

    const i18n = function (lang, keyword, variables = {}) {
        if (!languages[lang] || !languages[lang][keyword]) {
            return keyword;
        }

        return languages[lang][keyword].replace(
            /\{{2}(.+?)\}{2}/g,
            (_, variable) => variables[variable] || variable
        );
    };

    i18n.languages = Object.keys(languages);
    return i18n;
};