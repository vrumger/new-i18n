`use strict`;

const I18n = require(`./i18n`);

module.exports = (folder, languages, fallback = null) =>
    new I18n(folder, languages, fallback);
