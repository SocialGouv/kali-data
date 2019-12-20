import dilaClient from "./dila-client";
import normalizeIdcc from "./normalizeIdcc";

import conventions from "../data/index";

const getShortTitle = idcc => {
  const convention = conventions.find(
    c => normalizeIdcc(c.num) === normalizeIdcc(idcc)
  );
  return convention && convention.shortTitle;
};

export const getCcnContainer = id =>
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
      // use dila categorisation
      shortTitle:
        (data.categorisation &&
          data.categorisation.length &&
          data.categorisation[0]) ||
        data.titre
    }));
