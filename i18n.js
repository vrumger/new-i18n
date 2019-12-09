class I18n extends Function {
    constructor(folder, languages, fallback = null) {
        if (
            !languages ||
            Array.isArray(languages) && languages.length === 0
        ) {
            throw new Error(`You need to add at least one language.`);
        }

        super();
        this._fallback = fallback;
        this._languages = languages.reduce((languages, language) => {
            languages[language] = require(`${folder}/${language}.json`);
            return languages;
        }, {});

        return new Proxy(this, {
            apply(target, _, [language, keyword, variables = {}]) {
                return target.translate(language, keyword, variables);
            },
        });
    }

    get languages() {
        return Object.keys(this._languages);
    }

    get fallback() {
        return this._fallback;
    }

    set fallback(fallback) {
        this._fallback = fallback;
    }

    translate(language, keyword, variables = {}) {
        if (!this._languages[language]) {
            return keyword;
        }

        const value = keyword
            .split(`.`)
            .reduce((res, key) => res && res[key], this._languages[language]);

        if (!value) {
            if (this._fallback && language !== this._fallback) {
                return this.translate(this._fallback, keyword, variables);
            }

            return keyword;
        }

        return value.replace(
            /\{{2}(.+?)\}{2}/g,
            (_, variable) => variables[variable] || variable,
        );
    }
}

module.exports = I18n;
