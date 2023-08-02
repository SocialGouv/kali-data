import xlsx from "node-xlsx";
import DilaApiClient from "@socialgouv/dila-api-client";
import fs from "fs";

import dataJson = require("../data/index.json");

const dilaApi = new DilaApiClient();

type ConventionCollective = {
  name: string;
  num: number;
};

type KaliInfo = {
  type: "convention collective";
  data: {
    num: number;
    title: string;
    id: string;
    shortTitle: string;
    categorisation: Array<string>;
  };
  children: [];
};

type DataJsonInfo = {
  active?: boolean;
  date_publi?: string;
  etat?: string;
  id: string;
  mtime?: number;
  nature: string;
  num: number;
  shortTitle: string;
  texte_de_base?: string;
  title: string;
  url?: string;
  effectif?: number;
  synonymes?: string[];
};

function getDifferenceBetweenDataAndXlsx(): {
  ccManquante: ConventionCollective[];
  ccEnTrop: ConventionCollective[];
} {
  const workSheetsFromFile = xlsx.parse(`${__dirname}/data/list_cc.xlsx`);

  const supportedCcXlsx: ConventionCollective[] = [];

  workSheetsFromFile[0].data.forEach((row: string[]) => {
    const ccNumber = parseInt(row[0]);
    const ccName = row[1];
    const ccNameWithoutParenthesis = ccName.replace(/\(.*\)/g, "");
    if (ccNumber && ccNumber < 5000) {
      supportedCcXlsx.push({
        name: ccNameWithoutParenthesis,
        num: ccNumber,
      });
    }
  });

  const supportedCcIndexJson: ConventionCollective[] = dataJson.map(cc => {
    return {
      name: cc.title,
      num: cc.num,
    };
  });

  const ccManquante: ConventionCollective[] = supportedCcXlsx.filter(
    ccIndex => !supportedCcIndexJson.find(ccXlsx => ccXlsx.num === ccIndex.num),
  );

  const ccEnTrop = supportedCcIndexJson.filter(
    ccXlsx => !supportedCcXlsx.find(ccIndex => ccIndex.num === ccXlsx.num),
  );

  return { ccManquante, ccEnTrop };
}

async function getKaliInfo(idccNumber: number): Promise<KaliInfo> {
  if (!process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET) {
    throw new Error("OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET is not defined");
  }
  const result = await dilaApi.fetch({
    method: "POST",
    params: {
      id: idccNumber,
    },
    path: "consult/kaliContIdcc",
  });
  return {
    type: "convention collective",
    data: {
      num: parseInt(result.num),
      id: result.id,
      title: result.titre,
      shortTitle: (result.categorisation && result.categorisation[0]) ?? result.titre,
      categorisation: result.categorisation ?? [],
    },
    children: [],
  };
}

async function main() {
  const { ccManquante, ccEnTrop } = getDifferenceBetweenDataAndXlsx();
  console.log("ccManquante", ccManquante);
  console.log("ccEnTrop", ccEnTrop);
  for (const cc of ccManquante) {
    const kaliInfo = await getKaliInfo(cc.num);
    fs.writeFileSync(
      `../data/${kaliInfo.data.id}.json`,
      JSON.stringify(kaliInfo, null, 2),
      "utf-8",
    );
    dataJson.push({
      active: true,
      effectif: 1173,
      etat: "VIGUEUR_ETEN",
      date_publi: "2022-01-01T00:00:00.000Z",
      mtime: 1641210224,
      id: "KALICONT000044594539",
      nature: "IDCC",
      num: 3239,
      shortTitle: "Particuliers employeurs et emploi à domicile",
      texte_de_base: "KALITEXT000043941642",
      title:
        "Convention collective nationale des particuliers employeurs et de l'emploi à domicile du 15 mars 2021 - Étendue par arrêté du 6 octobre 2021 JORF 16 octobre 2021",
      synonymes: [
        "nounou",
        "nourrice",
        "2111",
        "2395",
        "assistants maternels",
        "particulier employeur",
        "assistantes maternelles",
      ],
      url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
    });
  }
  fs.writeFileSync("../data/index.json", JSON.stringify(dataJson, null, 2), "utf-8");
  for (const cc of ccEnTrop) {
    fs.unlinkSync(`../data/${cc.num}.json`);
  }
}

console.log(getKaliInfo(3239));
