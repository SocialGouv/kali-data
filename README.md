# @socialgouv/kali-data

[![License][img-license]][link-license]
[![NPM Version][img-npm]][link-npm]
[![Code Coverage][img-coverage]][link-coverage]

Extracted with [dila-api-client][link-dila-api-client] from [DILA API][link-aife-api] API using
[unist (Univeral Syntax Tree)][link-unist] structure.

- [Usage](#usage)
  - [Getting started](#getting-started)
  - [API](#api)
    - [getAgreement()](#getagreement)
    - [getAgreementArticles()](#getagreementarticles)
    - [getArticle()](#getarticle)
    - [getAgreements()](#getagreements)
    - [getArticles()](#getarticles)
    - [hasAgreement()](#hasagreement)
    - [hasArticle()](#hasarticle)
  - [License](#license)
- [Contributing](#contributing)
  - [Getting started](#getting-started-1)
  - [Data Generation](#data-generation)
  - [Tests](#tests)
- [References](#references)
- [See Also](#see-also)

## Usage

### Getting started

```sh
npm i @socialgouv/kali-data
```

### API

This package is typed with Typscript, you can check the returns type details [there][link-typings].

#### getAgreement()

Get a full agreement [unist][link-unist] tree with its sections and articles.

| Parameter           | Type              | Default      | Description          |
| ------------------- | ----------------- | ------------ | -------------------- |
| `agreementIdOrIdcc` | `number | string` | **required** | Agreement ID or IDCC |

**Return Type**

```ts
KaliData.Agreement
```

#### getAgreementArticles()

Get a flat [unist][link-unist] array of all the articles an agreement contains.

| Parameter           | Type              | Default      | Description          |
| ------------------- | ----------------- | ------------ | -------------------- |
| `agreementIdOrIdcc` | `number | string` | **required** | Agreement ID or IDCC |

**Return Type**

```ts
KaliData.AgreementArticleWithSections[]
```

#### getArticle()

Get an agreement article [unist][link-unist] node.

| Parameter   | Type     | Default      | Description |
| ----------- | -------- | ------------ | ----------- |
| `articleId` | `string` | **required** | Article ID  |

**Return Type**

```ts
KaliData.AgreementArticleWithSections
```

#### getAgreements()

Get the full list of indexed agreements.

**Return Type**

```ts
KaliData.IndexedAgreement[]
```

#### getArticles()

Get the full list of indexed articles.

**Return Type**

```ts
KaliData.IndexedArticle[]
```

#### hasAgreement()

Check if an agreement is available.

| Parameter           | Type              | Default      | Description          |
| ------------------- | ----------------- | ------------ | -------------------- |
| `agreementIdOrIdcc` | `number | string` | **required** | Agreement ID or IDCC |

**Return Type**

```ts
boolean
```

#### hasArticle()

Check if an article is available.

| Parameter   | Type     | Default      | Description |
| ----------- | -------- | ------------ | ----------- |
| `articleId` | `string` | **required** | Article ID  |

**Return Type**

```ts
boolean
```

### License

[![licence Apache 2.0][img-license]][link-license]

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
[link-dila-api-client]: https://github.com/SocialGouv/dila-api-client
[link-typings]: https://github.com/SocialGouv/kali-data/blob/master/src/index.d.ts
[link-unist]: https://github.com/syntax-tree/unist
