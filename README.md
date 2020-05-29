# KALI Data

[![License][img-license]][link-license]
[![NPM Version][img-npm]][link-npm]
[![Code Coverage][img-coverage]][link-coverage]

Internal usage only. extracted with [dila-api-client](https://github.com/SocialGouv/dila-api-client).

Data files are structured with an [univeral syntax-tree](https://unifiedjs.com) structure.

## Packages

- **data**: `@socialgouv/kali-data` public package ([documentation][link-data-readme]).
- **api**: Web-serviced API for internal usage only ([documentation][link-api-readme]).
- **generator**: Generator leveraging DILA API to generate agreements data.
- **typings**: Internal type-checking references.

## Contributing

### Getting started

First, you'll need to create an application on [PISTE][link-aife-api] and select **DILA - Légifrance
Beta** API.

Then:

```sh
yarn
yarn setup
```

This will automatically prompt and store your OAuth Client ID & Secret.

### Data Generation

`yarn data:update` will automatically fetch, match, list and check **data** package agreements with
their articles.

- `yarn data:check` Check agreements consistency.
- `yarn data:fetch`: Update agreements articles from DILA API.
- `yarn data:match`: Update agreements articles index (matching articles ID with agreements ID).
- `yarn data:list` Update `REFERENCES.md` file.

### Tests

- `yarn test:lint`: Lint codebase.
- `yarn test:type`: Check typings.
- `yarn test:unit` Launch unit tests.
- `yarn test:update` Update unit tests snapshots.
- `yarn test:watch` Launch unit tests in watching mode.

#### E2E

You should first start a production-like **api** environment via docker:

- `yarn docker:restart` Restart **api** container with a new build.
- `yarn docker:start`: Start **api** container.
- `yarn docker:stop`: Stop **api** container.

Then: `yarn test:e2e` will launch the **api** end-to-end tests.

## References

The agreement references list is available [here][link-agreement-references].

## See Also

- [Code du travail numérique](https://github.com/SocialGouv/code-du-travail-numerique)
- [dila-api-client : Client JavaScript pour l'API DILA AIFE](https://github.com/SocialGouv/dila-api-client)
- [legi-data : base LEGI](https://github.com/SocialGouv/legi-data)
- [fiches-vdd : Fiches vos droits et démarches](https://github.com/SocialGouv/fiches-vdd)

---

[img-coverage]: https://badgen.net/codecov/c/github/SocialGouv/kali-data?style=flat-square
[img-license]: https://badgen.net/github/license/SocialGouv/kali-data?style=flat-square
[img-npm]: https://badgen.net/npm/v/@socialgouv/kali-data?style=flat-square

[link-coverage]: https://codecov.io/gh/SocialGouv/kali-data
[link-license]: https://github.com/SocialGouv/kali-data/blob/master/LICENSE
[link-npm]: https://www.npmjs.com/package/kali-data

[link-agreement-references]:
  https://github.com/SocialGouv/code-du-travail-backoffice/blob/master/REFERENCES.md
[link-aife-api]: https://developer.aife.economie.gouv.fr
[link-api-readme]:
  https://github.com/SocialGouv/code-du-travail-backoffice/blob/master/packages/api/README.md
[link-data-readme]:
  https://github.com/SocialGouv/code-du-travail-backoffice/blob/master/packages/data/README.md

