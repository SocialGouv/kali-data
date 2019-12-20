import pMap from "p-map";

import dilaClient from "./dila-client";

const MAX_TRIES = 10;
const CONCURRENCY = 5;

const getText = (id, tries = 0) =>
  dilaClient
    .fetch({
      path: "consult/kaliText",
      method: "POST",
      params: {
        id
      }
    })
    // ensure valid
    .then(r => {
      if (Object.keys(r).length === 1) {
        throw new Error(`invalid response for ${id}`, r);
      }
      console.log(`getText ${id} ${tries + 1}/${MAX_TRIES}: OK`);
      return r;
    })
    // retry
    .catch(e => {
      if (tries < MAX_TRIES) {
        console.log(`getText ${id} ${tries + 1}/${MAX_TRIES}: RETRY`);
        return getText(id, tries + 1);
      }
      console.log(`getText ${id} ${tries + 1}/${MAX_TRIES}: ABORT`);
      throw e;
    });

const fetchAdditionalTexts = section =>
  pMap(
    section.sections,
    async text => ({
      ...((text.id.match(/^KALITEXT/) && (await getText(text.id))) || text)
    }),
    {
      concurrency: CONCURRENCY,
      stopOnError: true
    }
  );

// embed CCN texts for attachés + salaires
// conteneur first section is always "texte de base"
// conteneur following sections are "textes attachées" and "textes salaires" but are not populated in the initial conteneur data
export const embedCcnTexts = async ccn => {
  if (!ccn.sections) {
    console.error(`ERROR: CCN "${ccn.id}" has no sections`);
    return {
      ...ccn,
      sections: []
    };
  }
  const additionalTexts = ccn.sections.slice(1);
  const additionalTextsFilled = await Promise.all(
    additionalTexts.map(emptyAdditionalTexts =>
      fetchAdditionalTexts(emptyAdditionalTexts).then(
        filledAdditionalTexts => ({
          ...emptyAdditionalTexts,
          sections: filledAdditionalTexts
        })
      )
    )
  );

  return {
    ...ccn,
    sections: [
      // texte de base (included in original conteneur)
      ccn.sections[0],
      // textes attaches & textes salaires
      ...additionalTextsFilled
    ]
  };
};
