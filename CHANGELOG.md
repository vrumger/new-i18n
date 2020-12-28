# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0-0] 2020-05-20

### Changed

- Switched to TypeScript

## [2.0.0] - 2020-04-19

### Changed

- If there's no return value, it will return `null` instead of the keyword
- `.update` now accepts a deeply nested object (`{ some: { key: 'value' } }`) instead of an object with period delimited keys (`{ 'some.key': 'value' }`)

[2.0.0]: https://github.com/AndrewLaneX/new-i18n/tree/v2.0.0
[3.0.0-0]: https://github.com/AndrewLaneX/new-i18n/tree/v3.0.0-0
