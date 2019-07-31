const sortByIntOrdre = (a, b) => {
  if (a.intOrdre < b.intOrdre) {
    return -1;
  }
  if (a.intOrdre > b.intOrdre) {
    return 1;
  }
  return 0;
};

const numify = id => parseInt(id.replace(/^KALIARTI/, ""));

const isValidSection = node => node.etat !== "ABROGE" && node.etat !== "PERIME";
// the API returns all the version of a given article. we pick the latest one
const isValidArticle = (currentArticle, index, articles) => {
  const maxVersion = Math.max(
    ...articles
      .filter(
        article =>
          article.cid === currentArticle.cid && article.id !== currentArticle.id
      )
      .map(article => numify(article.id)),
    0
  );
  return numify(currentArticle.id) > maxVersion;
};

// beware, this one is recursive for sections !
export const filterData = node => ({
  ...{
    id: node.id,
    num: node.num,
    intOrdre: node.intOrdre,
    title: node.title,
    content: node.content,
    ...(node.dateParution && { dateParution: node.dateParution }),
    ...(node.etat && { etat: node.etat }),
    ...(node.surtitre && { surtitre: node.surtitre }),
    ...(node.historique && { historique: node.historique })
  },
  ...(node.articles &&
    node.articles.length && {
      articles: node.articles
        .filter(isValidArticle)
        .map(filterData)
        .sort(sortByIntOrdre)
    }),
  ...(node.sections &&
    node.sections.length && {
      sections: node.sections
        .filter(isValidSection)
        .map(filterData)
        .sort(sortByIntOrdre)
    })
});
