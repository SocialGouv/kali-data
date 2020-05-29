# @socialgouv/kali-data

[![License][img-license]][link-license]
[![NPM Version][img-npm]][link-npm]

Extracted with [dila-api-client][link-dila-api-client] from [DILA API][link-aife-api] API using
[unist (Univeral Syntax Tree)][link-unist] structure.

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

### See Also

- [Unified](https://unifiedjs.com/)

---

[img-license]: https://badgen.net/github/license/SocialGouv/kali-data?style=flat-square
[img-npm]: https://badgen.net/npm/v/@socialgouv/kali-data?style=flat-square

[link-license]: https://github.com/SocialGouv/kali-data/blob/master/packages/data/LICENSE
[link-npm]: https://www.npmjs.com/package/kali-data

[link-aife-api]: https://developer.aife.economie.gouv.fr
[link-dila-api-client]: https://github.com/SocialGouv/dila-api-client
[link-typings]: https://github.com/SocialGouv/kali-data/blob/master/packages/data/src/index.d.ts
[link-unisdialt]: https://github.com/syntax-tree/unist
[link-unist]: https://github.com/syntax-tree/unist
