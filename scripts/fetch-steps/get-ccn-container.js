import dilaClient from "../dila-client";

import shortLabels from "../../data/short-idcc-labels";

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
      shortTitle: shortLabels[data.num.toString(10)] || undefined
    }));
