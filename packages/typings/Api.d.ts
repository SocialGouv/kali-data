import "@socialgouv/kali-data";

export as namespace Api;

type EnrichedArticle = KaliData.AgreementArticleData & {
  /** Sections path. */
  path: string;
};
