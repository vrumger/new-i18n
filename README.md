# new-i18n

new-i18n is a simple and easy to use internationalization library.

# Installation

```sh
npm install new-i18n
```

# Example

> There's a full working example [here](https://gist.github.com/YouTwitFace♠/618298c5ef179eebc511ca8c8a82eb76)

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
const newI18n = require('new-i18n');
const i18n = newI18n('./localization', ['en', 'pt']);

console.log('English:', i18n('en', 'hello_world')); // 'Hello World'
console.log('Portuguese:', i18n('pt', 'hello_world')); // 'Olá Mundo'
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
console.log(i18n('en', 'hi', { name: '...' })); // 'Hi ...!'
```

# Updating Varaibles

[//]: # '{% raw %}'

```js
i18n.update('en', { hi: 'Hello {{name}}!' });
console.log(i18n('en', 'hi', { name: '...' })); // 'Hhello ...!'
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
const newI18n = require('new-i18n');
const i18n = newI18n('./localization', ['en', 'pt']);

console.log('English:', i18n('en', 'nested.hello_world')); // 'Hello World'
console.log('Portuguese:', i18n('pt', 'nested.hello_world')); // 'Olá Mundo'
```

# Getting all the languages

```js
const newI18n = require('new-i18n');
const i18n = newI18n('./localization', ['en', 'pt']);

console.log(i18n.languages); // ['en', 'pt']
```
