import dilaClient from "../dila-client";

import conventions from "../../data/index";

const getShortTitle = idcc => {
  const convention = conventions.find(c => c.num === idcc);
  return convention && convention.shortTitle;
};

export const getCCNContainer = id =>
  dilaClient
    .fetch({
      path: "consult/kaliCont",
      method: "POST",
      params: {
        id
      }
    })
    .then(data => ({
      ...data,
      // we normalize title tag, it is "title" everywhere else in the api
      // ¯\_(ツ)_/¯
      title: data.titre,
      // add hard-coded short name from our index
      shortTitle: getShortTitle[data.num.toString(10)] || undefined
    }));
