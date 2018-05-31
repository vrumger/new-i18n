# new-i18n
new-i18n is a simple and easy to use internationalization library.

# Installation
```sh
npm install new-i18n
```

# Example
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

console.log('English:', i18n('en', 'hello_world'));
console.log('Portuguese:', i18n('pt', 'hello_world'));
```

# Adding variables

```json
{
    "hi": "Hi {{name}}!"
}
```

```js
console.log(i18n('en', 'hi', { name: '...' }));
```
