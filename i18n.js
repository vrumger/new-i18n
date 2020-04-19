const _update = (oldValues, newValues) => {
    return Object.keys(newValues).reduce(
        (result, key) => {
            if (typeof newValues[key] === `object`) {
                result[key] = _update(result[key], newValues[key]);
            } else {
                result[key] = newValues[key];
            }

            return result;
        },
        { ...oldValues },
    );
};

class I18n extends Function {
    constructor(folder, languages, fallback = null) {
        if (
            !languages ||
            Array.isArray(languages) && languages.length === 0
        ) {
            throw new Error(`You need to add at least one language.`);
        }

        super();
        this.fallback = fallback;
        this._languages = new Map(
            languages.map(language => [
                language,
                require(`${folder}/${language}.json`),
            ]),
        );

        return new Proxy(this, {
            apply(target, _, [language, keyword, variables = {}]) {
                return target.translate(language, keyword, variables);
            },
        });
    }

    get languages() {
        return [...this._languages.keys()];
    }

    _fallback(language, keyword, variables = {}) {
        if (this.fallback && language !== this.fallback) {
            return this.translate(this.fallback, keyword, variables);
        }

        return null;
    }

    translate(language, keyword, variables = {}) {
        if (!this._languages.has(language)) {
            return this._fallback(language, keyword, variables);
        }

        const value = keyword
            .split(`.`)
            .reduce(
                (res, key) => res && res[key],
                this._languages.get(language),
            );

        if (!value) {
            return this._fallback(language, keyword, variables);
        }

        return value.replace(
            /\{{2}(.+?)\}{2}/g,
            (_, variable) => variables[variable] || variable,
        );
    }

    update(language, newValues) {
        if (typeof language !== `string`) {
            throw new Error(`Invalid language type: ${typeof language}`);
        } else if (typeof newValues !== `object`) {
            throw new Error(`Invalid values type: ${typeof newValues}`);
        }

        const oldValues = this._languages.get(language);
        this._languages.set(language, _update(oldValues, newValues));
    }
}

module.exports = I18n;
