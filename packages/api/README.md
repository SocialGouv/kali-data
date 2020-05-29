# KALI Data API

[![License][img-license]][link-license]

## API

### [GET] `/`

[Swagger 2.0](https://swagger.io/docs/) description.

### [GET] `/agreement/{agreementIdOrIdcc}`

Raw agreement [unist][link-unist] tree (with parent sections attached to each article).

**Path:**
- `agreementIdOrIdcc`: `string` Agreement ID or IDCC. **Required**.

### [GET] `/agreements`

Indexed agreements list.

**Query:**
- `query`: `string` Search query.

### [GET] `/article/{articleId}`

Article item.

**Path:**
- `articleId`: `string` Article ID. **Required**.
 
### [GET] `/articles`

Articles list.

**Query:**
- `agreementIdOrIdcc`: `string` Agreement ID or IDCC. **Required**.
- `query`: `string` Search query. **Required**.

---

[img-license]: https://badgen.net/github/license/SocialGouv/kali-data?style=flat-square

[link-license]: https://github.com/SocialGouv/kali-data/blob/master/packages/data/LICENSE

[link-unist]: https://github.com/syntax-tree/unist
