import xlsx from "node-xlsx";
import DilaApiClient from "@socialgouv/dila-api-client";
import fs from "fs";

import dataJson = require("../data/index.json");

const dilaApi = new DilaApiClient();

type ConventionCollective = {
  name: string;
  num: number;
};

type DilaResponse = {
  executionTime: number;
  id: string;
  titre: string;
  numeroTexte: string;
  num: string;
  nature: string;
  categorisation: string[];
  activitePro: string[];
  sections: {
    executionTime: number;
    dereferenced: boolean;
    id?: string;
    cid?: string;
    intOrdre: number;
    etat: string;
    title: string;
    dateModif: any;
    dateDebut: any;
    dateFin: any;
    sectionConsultee: boolean;
    sections: any[];
    articles: any[];
    commentaire: any;
    renvoi: any;
    renvoiNum: any;
    notaHtml: any;
    notaSectionsAafficher: any;
  }[];
  descriptionFusionHtml: any;
  texteBaseId: string[];
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

async function getKaliInfo(idccNumber: number): Promise<DilaResponse> {
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
  return result;
}

async function main() {
  const { ccManquante, ccEnTrop } = getDifferenceBetweenDataAndXlsx();
  for (const cc of ccManquante) {
    const dilaInfo = await getKaliInfo(cc.num);
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
      `../data/${kaliInfo.data.id}.json`,
      JSON.stringify(kaliInfo, null, 2),
      "utf-8",
    );
    dataJson.push({
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
  for (const cc of ccEnTrop) {
    const element = dataJson.find(ccIndex => ccIndex.num === cc.num);
    if (element) {
      const index = dataJson.indexOf(element);
      dataJson.splice(index, 1);
      fs.unlinkSync(`../data/${element.id}.json`);
    }
  }
  fs.writeFileSync("../data/index.json", JSON.stringify(dataJson, null, 2), "utf-8");
}

main();
