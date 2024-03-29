# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- None.

## [1.0.0-alpha.3] - 2024-03-22

### Fixed

- Method `isSemanticSameTypeOf` support prefixed types.

### Changed

- Update `rdf-ext` to version 2.5.1.
- Update `@types/rdf-ext` to version 2.5.0.
- Do not require `semanticType` in constructor.

### Added

- More tests to test the `equals` method.
- New `Semantizer` and `Context` classes with corresponding interfaces.
- Ability to provide a context and pass prefixed URIs.

## [1.0.0-alpha.2] - 2023-05-23

### Added

- .gitignore

### Changed

- Update @types/rdf-ext to version 2.2.0.

## [1.0.0-alpha.1] - 2023-03-28

### Added

- CHANGELOG.md

### Changed

- Use RDFJS datasets.
- LICENSE is now MIT (AGPL3 before).

## [1.0.0-alpha] - 2022-10-25

### Added

- Initial release.

[unreleased]: https://github.com/assemblee-virtuelle/semantizer-typescript/compare/v1.0.0-alpha.3...HEAD
[1.0.0-alpha.3]: https://github.com/assemblee-virtuelle/semantizer-typescript/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/assemblee-virtuelle/semantizer-typescript/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/assemblee-virtuelle/semantizer-typescript/compare/v1.0.0-alpha...v1.0.0-alpha.1
[1.0.0-alpha]: https://github.com/assemblee-virtuelle/semantizer-typescript/releases/tag/v1.0.0-alpha
