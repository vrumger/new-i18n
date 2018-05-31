`use strict`;

const languages = {};

module.exports = (folder, langs = []) => {
    langs.forEach(lang => (languages[lang] = require(`${folder}/${lang}.json`)));

    return (lang, keyword, variables = {}) => {
        return languages[lang][keyword].replace(
            /\{{2}(.+?)\}{2}/g,
            (_, variable) => variables[variable] || variable
        );
    };
};
