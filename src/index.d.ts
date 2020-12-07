// Type definitions for @socialgouv/kali-data

/**
 * Get a full agreement unist tree with its sections and articles.
 *
 * @see https://github.com/syntax-tree/unist
 */
export function getAgreement(agreementIdOrIdcc: number | string): KaliData.Agreement;

/**
 * Get a flat unist array of all the articles an agreement contains.
 * Each article includes a list of its parent sections.
 *
 * @see https://github.com/syntax-tree/unist
 *
 * @deprecated Use `getAgreementArticlesWithPath()` instead.
 */
export function getAgreementArticlesWithParentSections(
  agreementIdOrIdcc: number | string,
): KaliData.AgreementArticleWithParentSections[];

/**
 * Get a flat unist array of all the articles an agreement contains.
 * Each article includes its parent sections path, as an ordered list of their titles.
 *
 * @see https://github.com/syntax-tree/unist
 */
export function getAgreementArticlesWithPath(
  agreementIdOrIdcc: number | string,
): KaliData.AgreementArticleWithPath[];

/**
 * Convert any agreement ID or IDCC into a normalized agreement ID.
 */
export function getAgreementIdFromIdOrIdcc(agreementIdOrIdcc: number | string): string;

/**
 * Get the full list of indexed agreements.
 */
export function getAgreements(): KaliData.IndexedAgreement[];

/**
 * Get the full list of indexed articles.
 */
export function getArticles(): KaliData.IndexedArticle[];

/**
 * Get an agreement article unist node with its parent sections.
 *
 * @see https://github.com/syntax-tree/unist
 *
 * @deprecated Use `getArticleWithPath()` instead.
 */
export function getArticleWithParentSections(
  articleIdOrCid: string,
): KaliData.AgreementArticleWithParentSections;

/**
 * Get an agreement article unist node with its parent sections path.
 * The parent sections path is represented as an ordered array of their titles.
 *
 * @see https://github.com/syntax-tree/unist
 */
export function getArticleWithPath(articleIdOrCid: string): KaliData.AgreementArticleWithPath;

/**
 * Get an indexed article.
 */
export function getIndexedArticle(articleIdOrCid: string): KaliData.IndexedArticle;

/**
 * Check if an agreement is available.
 */
export function hasAgreement(agreementIdOrIdcc: number | string): boolean;

/**
 * Check if an article is available.
 */
export function hasArticle(articleIdOrCid: string): boolean;

export as namespace KaliData;

/**
 * TODO Check and describe types.
 */

/**
 * Agreement or Article State.
 *
 * - ABROGE: ...
 * - DENONCE: ...
 * - MODIFIE: ...
 * - PERIME: ...
 * - REMPLACE: ...
 * - VIGUEUR: ...
 * - VIGUEUR_ETEN: ...
 * - VIGUEUR_NON_ETEN: ...
 */
type State =
  | "ABROGE"
  | "DENONCE"
  | "MODIFIE"
  | "PERIME"
  | "REMPLACE"
  | "VIGUEUR"
  | "VIGUEUR_ETEN"
  | "VIGUEUR_NON_ETEN";

type Agreement = {
  type: "section";
  data: AgreementData;
  children: AgreementSection[];
};

type AgreementData = {
  num: number;
  title: string;
  id: string;
  shortTitle: string;
  categorisation: string[];
};

type AgreementSection = {
  type: "section";
  data: AgreementSectionData;
  children: (AgreementArticle | AgreementSection)[];
};

type AgreementSectionData = {
  cid: string;
  intOrdre: number;
  id: string;
  title: string;
  etat: State;
};

type AgreementArticle = {
  type: "article";
  data: AgreementArticleData;
};

type AgreementArticleData = {
  cid: string;
  intOrdre: number;
  id: string;
  /** Legal index */
  num?: string;
  /** HTML content */
  content: string;
  etat: State;
  surtitre?: string;
  historique?: string;
  lstLienModification: AgreementArticleDataLinkUpdate[];
};

type AgreementArticleDataLinkUpdate = {
  textCid: string;
  textTitle: string;
  linkType:
    | "ABROGATION"
    | "ABROGE"
    | "CREATION"
    | "CREE"
    | "DENONCE"
    | "DENONCIATION"
    | "ELARGISSEMENT"
    | "ELARGIT"
    | "ETEND"
    | "EXTENSION"
    | "MODIFICATION"
    | "MODIFIE"
    | "PEREMPTION"
    | "PERIME";
  linkOrientation: "cible" | "source";
  articleNum: string;
  articleId: string;
  natureText: string;
  /** Publication date (YYYY-MM-DD) */
  datePubliTexte: string | null;
  /** ??? date (YYYY-MM-DD) */
  dateSignaTexte: string | null;
  /** ??? date (YYYY-MM-DD) */
  dateDebutCible: string | null;
};

type IndexedAgreement = {
  active?: boolean;
  /** Publication ISO date */
  date_publi?: string;
  effectif?: number;
  etat?: State;
  /** Agreement ID */
  id: string;
  mtime?: number;
  nature: "IDCC";
  /** Agreement IDCC */
  num: number;
  shortTitle: string;
  texte_de_base?: string;
  title: string;
  url?: string;
  synonymes: string[];
};

type IndexedArticle = {
  /** Agreement ID */
  agreementId: string;
  /** Article CID */
  articleCid: string;
  /** Article ID */
  articleId: string;
  /** Sections path */
  path: string[];
};

type AgreementArticleWithParentSections = AgreementArticle & {
  sections: Array<{
    type: "section";
    data: AgreementSectionData;
  }>;
};

type AgreementArticleWithPath = AgreementArticle & {
  path: string[];
};
