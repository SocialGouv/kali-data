import fs from "fs";
import dataJson = require("../data/index.json");
import { getInfosCcs } from "./infos";
import { getKaliInfoWithKaliContainerId } from "./api";
import { KaliInfo } from "./types";

async function main() {
  const ccs = getInfosCcs();
  const copyDataJson = [...dataJson];
  for (const cc of ccs) {
    const dilaInfo = await getKaliInfoWithKaliContainerId(cc.id);
    if (dilaInfo) {
      const kaliInfo: KaliInfo = {
        type: "convention collective",
        data: {
          num: parseInt(dilaInfo.num),
          id: dilaInfo.id,
          title: dilaInfo.titre,
          shortTitle: (dilaInfo.categorisation && dilaInfo.categorisation[0]) ?? dilaInfo.titre,
          categorisation: dilaInfo.categorisation ?? [],
        },
        children: [],
      };
      fs.writeFileSync(
        process.cwd() + `/data/${kaliInfo.data.id}.json`,
        JSON.stringify(kaliInfo, null, 2),
        "utf-8",
      );
      copyDataJson.push({
        active: true,
        etat: dilaInfo.sections[0].etat,
        id: kaliInfo.data.id,
        nature: dilaInfo.nature,
        num: kaliInfo.data.num,
        shortTitle: kaliInfo.data.shortTitle,
        texte_de_base: dilaInfo.texteBaseId[0],
        title: kaliInfo.data.title,
        url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=" + kaliInfo.data.id,
      });
    }
  }
  fs.writeFileSync(
    process.cwd() + "/data/index.json",
    JSON.stringify(copyDataJson, null, 2),
    "utf-8",
  );
}

main();
