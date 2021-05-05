# new-i18n

new-i18n is a simple and easy to use internationalization library.

# Changelog

See [CHANGELOG.md](https://github.com/AndrewLaneX/new-i18n/blob/typescript/CHANGELOG.md)

# Installation

```sh
npm install new-i18n
```

# Example

> There's a full working example [here](https://gist.github.com/AndrewLaneX/618298c5ef179eebc511ca8c8a82eb76)

`localization/en.json`:

```json
{
    "hello_world": "Hello World"
}
```

`localization/pt.json`:

```json
{
    "hello_world": "Olá Mundo"
}
```

`index.js`:

```js
const { default: newi18n } = require('new-i18n')
const i18n = new newi18n(__dirname, ["en","pt"], "en");

console.log('English:', i18n.translate('en', 'hello_world'));
console.log('Portuguese:', i18n.translate('pt', 'hello_world'));

console.log(i18n.translate('en', 'hi', { name: '...' }));
console.log(i18n.translate('pt', 'hi', { name: '...' }));

i18n.update('en', { hi: 'Hello my name is {{name}}!' });
i18n.update('pt', { hi: 'Olá meu nome é {{name}}!' });

console.log(i18n.translate('en', 'hi', { name: '...' }));
console.log(i18n.translate('pt', 'hi', { name: '...' }));

console.log(`newi18n languages: ${i18n.languages}`)
```

# Adding variables

[//]: # '{% raw %}'

```json
{
    "hi": "Hi {{name}}!"
}
```

[//]: # '{% endraw %}'

```js
i18n.translate('en', 'hi', { name: '...' }); // 'Hi ...!'
```

# Updating Varaibles

[//]: # '{% raw %}'

```js
i18n.update('en', { hi: 'Hello my name is {{name}}!' });
i18n.translate('en', 'hi', { name: '...' }); // 'Hello ...!'
```

[//]: # '{% endraw %}'

# Nesting

`localization/en.json`:

```json
{
    "nested": {
        "hello_world": "Hello World"
    }
}
```

`localization/pt.json`:

```json
{
    "nested": {
        "hello_world": "Olá Mundo"
    }
}
```

`index.js`:

```js
i18n.translate('en', 'nested.hello_world'); // 'Hello World'
i18n.translate('pt', 'nested.hello_world'); // 'Olá Mundo'
```

# Getting all the languages

```js
i18n.languages; // ['en', 'pt']
```
