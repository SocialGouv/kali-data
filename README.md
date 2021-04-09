# @socialgouv/kali-data

[![License][img-license]][link-license]
[![NPM Version][img-npm]][link-npm]
[![Code Coverage][img-coverage]][link-coverage]

---

Dump JSON régulier des conventions collectives publiées par l'API DILA.

:warning: Experimental, for internal usage only :warning:

---

Extracted with [dila-api-client][link-dila-api-client] from [DILA API][link-aife-api] API using
[unist (Univeral Syntax Tree)][link-unist] structure.

- [Usage](#usage)
  - [Getting started](#getting-started)
  - [Definitions](#definitions)
    - [Agreement](#agreement)
    - [Article](#article)
  - [API](#api)
    - [Data](#data)
    - [getAgreement()](#getagreement)
    - [getAgreementArticlesWithParentSections()](#getagreementarticleswithparentsections)
    - [getAgreementArticlesWithPath()](#getagreementarticleswithpath)
    - [getAgreementIdFromIdOrIdcc()](#getagreementidfromidoridcc)
    - [getAgreements()](#getagreements)
    - [getArticles()](#getarticles)
    - [getArticleWithParentSections()](#getarticlewithparentsections)
    - [getArticleWithPath()](#getarticlewithpath)
    - [getIndexedArticle()](#getindexedarticle)
    - [hasAgreement()](#hasagreement)
    - [hasArticle()](#hasarticle)
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

### Definitions

#### Agreement

An agreement is a labor agreement (_convention collective_ in French). Only national agreements
are available at the moment. Each agreement is made up of articles wrapped within sections.

#### Article

An article always refers to an agreement article.

### API

This package is typed with Typescript, you can check the returns type details [there][link-typings].

#### Data

It's possible to require any of the [available agreements][link-agreement-references] JSON
[unist][link-unist] tree straight from the data directory:

```js
const JournalismAgreement = require("@socialgouv/kali-data/data/KALITEXT000005652402.json");
```

And the list of available agreements with :

```js
const agreements = require("@socialgouv/kali-data/data/index.json");
```

**Return Type**

```ts
KaliData.Agreement
```

#### getAgreement()

Get a full agreement [unist][link-unist] tree with its sections and articles.

| Parameter           | Type               | Default      | Description          |
| ------------------- | ------------------ | ------------ | -------------------- |
| `agreementIdOrIdcc` | `number \| string` | **required** | Agreement ID or IDCC |

**Return Type**

```ts
KaliData.Agreement
```

#### getAgreementArticlesWithParentSections()

:warning: _**Deprecated:** Use `getAgreementArticlesWithPath()` instead._

Get a flat [unist][link-unist] array of all the articles an agreement contains.

Each article includes a list of its parent sections.

| Parameter           | Type               | Default      | Description          |
| ------------------- | ------------------ | ------------ | -------------------- |
| `agreementIdOrIdcc` | `number \| string` | **required** | Agreement ID or IDCC |

**Return Type**

```ts
KaliData.AgreementArticleWithParentSections[]
```

#### getAgreementArticlesWithPath()

Get a flat [unist][link-unist] array of all the articles an agreement contains.

Each article includes its parent sections path, as an ordered list of their titles.

| Parameter           | Type               | Default      | Description          |
| ------------------- | ------------------ | ------------ | -------------------- |
| `agreementIdOrIdcc` | `number \| string` | **required** | Agreement ID or IDCC |

**Return Type**

```ts
KaliData.AgreementArticleWithPath[]
```

#### getAgreementIdFromIdOrIdcc()

Convert any agreement ID or IDCC into a normalized agreement ID.

| Parameter           | Type               | Default      | Description          |
| ------------------- | ------------------ | ------------ | -------------------- |
| `agreementIdOrIdcc` | `number \| string` | **required** | Agreement ID or IDCC |

**Return Type**

```ts
string
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

#### getArticleWithParentSections()

:warning: _**Deprecated:** Use `getArticleWithPath()` instead._

Get an agreement article [unist][link-unist] node with its parent sections.

| Parameter        | Type     | Default      | Description       |
| ---------------- | -------- | ------------ | ----------------- |
| `articleIdOrCid` | `string` | **required** | Article ID or CID |

**Return Type**

```ts
KaliData.AgreementArticleWithParentSections
```

#### getArticleWithPath()

Get an agreement article [unist][link-unist] node with its parent sections path.

The parent sections path is represented as an ordered array of their titles.

| Parameter        | Type     | Default      | Description       |
| ---------------- | -------- | ------------ | ----------------- |
| `articleIdOrCid` | `string` | **required** | Article ID or CID |

**Return Type**

```ts
KaliData.AgreementArticleWithPath
```

#### getIndexedArticle()

Get an indexed article.

| Parameter        | Type     | Default      | Description       |
| ---------------- | -------- | ------------ | ----------------- |
| `articleIdOrCid` | `string` | **required** | Article ID or CID |

**Return Type**

```ts
KaliData.IndexedArticle
```

#### hasAgreement()

Check if an agreement is available.

| Parameter           | Type               | Default      | Description          |
| ------------------- | ------------------ | ------------ | -------------------- |
| `agreementIdOrIdcc` | `number \| string` | **required** | Agreement ID or IDCC |

**Return Type**

```ts
boolean
```

#### hasArticle()

Check if an article is available.

| Parameter        | Type     | Default      | Description       |
| ---------------- | -------- | ------------ | ----------------- |
| `articleIdOrCid` | `string` | **required** | Article ID or CID |

**Return Type**

```ts
boolean
```

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
- `yarn data:match`: Update agreements articles index (matching articles ID & CID with their
  agreements ID).
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
- [dila-api-client : Client JavaScript pour l'API DILA AIFE][link-dila-api-client]
- [legi-data : base LEGI](https://github.com/SocialGouv/legi-data)
- [fiches-vdd : Fiches vos droits et démarches](https://github.com/SocialGouv/fiches-vdd)

---

[img-coverage]: https://badgen.net/codecov/c/github/SocialGouv/kali-data?style=flat-square
[img-license]: https://badgen.net/github/license/SocialGouv/kali-data?style=flat-square
[img-npm]: https://badgen.net/npm/v/@socialgouv/kali-data?style=flat-square

[link-coverage]: https://codecov.io/gh/SocialGouv/kali-data
[link-license]: https://github.com/SocialGouv/kali-data/blob/master/LICENSE
[link-npm]: https://www.npmjs.com/package/kali-data

[link-agreement-references]: https://github.com/SocialGouv/kali-data/blob/master/REFERENCES.md
[link-aife-api]: https://developer.aife.economie.gouv.fr
[link-dila-api-client]: https://github.com/SocialGouv/dila-api-client
[link-typings]: https://github.com/SocialGouv/kali-data/blob/master/src/index.d.ts
[link-unist]: https://github.com/syntax-tree/unist
