import pMap from "p-map";

import dilaClient from "../dila-client";

const getText = (id, tries = 0) =>
  dilaClient
    .fetch({
      path: "consult/kaliText",
      method: "POST",
      params: {
        id
      }
    })
    // retry
    .catch(e => {
      console.log(`getText ${id} ${tries + 1}/4`);
      if (tries < 3) {
        return getText(id, tries + 1);
      }
      throw e;
    });

const fetchAdditionalTexts = section =>
  pMap(
    section.sections, // are we sure that there will never be any articles in the root section ?
    async text => ({
      ...((text.id.match(/^KALITEXT/) && (await getText(text.id))) || text)
    }),
    {
      concurrency: 10
    }
  );

// embed CCN texts for attachés + salaires
// conteneur first section is always "texte de base"
// conteneur following sections are "textes attachées" and "textes salaires" but are not populated in the initial conteneur data
export const embedCCNTexts = async ccn => ({
  ...ccn,
  sections: [
    // texte de base (included in original conteneur)
    ccn.sections[0],
    // textes attaches & textes salaires
    ...(await Promise.all(
      ccn.sections.slice(1).map(emptyAdditionalTexts =>
        fetchAdditionalTexts(emptyAdditionalTexts).then(
          filledAdditionalTexts => ({
            ...emptyAdditionalTexts,
            sections: filledAdditionalTexts
          })
        )
      )
    ))
  ]
});
