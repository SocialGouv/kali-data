import xlsx from "node-xlsx";
import DilaApiClient from "@socialgouv/dila-api-client";
import fs = require("fs");
import csv = require("csv-parser");

import dataJson = require("../data/index.json");

const dilaApi = new DilaApiClient();

type ConventionCollective = {
  name: string;
  num: number;
  exampleSiret?: string;
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

type Diff = {
  ccManquante: ConventionCollective[];
  ccEnTrop: ConventionCollective[];
};

function getDifferenceBetweenDataAndDares(): Diff {
  const workSheetsFromFile = xlsx.parse(`${__dirname}/data/dares.xlsx`);

  const supportedCcXlsx: ConventionCollective[] = [];

  workSheetsFromFile[0].data.forEach((row: string[]) => {
    const ccNumber = parseInt(row[0]);
    const ccName = row[1];
    if (ccNumber && ccNumber < 5000 && ccName) {
      const ccNameWithoutParenthesis = ccName.replace(/\(.*annexée.*\)/gi, "").trim();
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

function getDifferenceBetweenDataAndWeez(): Promise<Diff> {
  return new Promise((resolve, reject) => {
    const supportedCcXlsx: ConventionCollective[] = [];

    fs.createReadStream(__dirname + "/data/weez.csv")
      .pipe(csv())
      .on("data", data => {
        const ccNumber = parseInt(data.IDCC);
        if (ccNumber && ccNumber < 5000 && !supportedCcXlsx.find(cc => cc.num === ccNumber)) {
          supportedCcXlsx.push({
            name: "?",
            num: ccNumber,
            exampleSiret: data.SIRET,
          });
        }
      })
      .on("end", () => {
        const supportedCcIndexJson = dataJson.map(cc => {
          return {
            name: cc.title,
            num: cc.num,
          };
        });

        const ccManquante = supportedCcXlsx.filter(
          ccIndex => !supportedCcIndexJson.find(ccXlsx => ccXlsx.num === ccIndex.num),
        );

        const ccEnTrop = supportedCcIndexJson.filter(
          ccXlsx => !supportedCcXlsx.find(ccIndex => ccIndex.num === ccXlsx.num),
        );

        resolve({ ccManquante, ccEnTrop });
      })
      .on("error", error => {
        reject(error);
      });
  });
}

async function getKaliInfo(idccNumber: number): Promise<DilaResponse | null> {
  if (!process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET) {
    throw new Error("OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET is not defined");
  }
  const result = await dilaApi
    .fetch({
      method: "POST",
      params: {
        id: idccNumber,
      },
      path: "consult/kaliContIdcc",
    })
    .catch((err: any) => {
      console.error(err);
      return null;
    });
  return result;
}

// async function main() {
//   const { ccManquante, ccEnTrop } = getDifferenceBetweenDataAndDares();
//   for (const cc of ccManquante) {
//     const dilaInfo = await getKaliInfo(cc.num);
//     if (dilaInfo) {
//       const kaliInfo: KaliInfo = {
//         type: "convention collective",
//         data: {
//           num: parseInt(dilaInfo.num),
//           id: dilaInfo.id,
//           title: dilaInfo.titre,
//           shortTitle: (dilaInfo.categorisation && dilaInfo.categorisation[0]) ?? dilaInfo.titre,
//           categorisation: dilaInfo.categorisation ?? [],
//         },
//         children: [],
//       };
//       fs.writeFileSync(
//         process.cwd() + `/data/${kaliInfo.data.id}.json`,
//         JSON.stringify(kaliInfo, null, 2),
//         "utf-8",
//       );
//       dataJson.push({
//         active: true,
//         etat: dilaInfo.sections[0].etat,
//         id: kaliInfo.data.id,
//         nature: dilaInfo.nature,
//         num: kaliInfo.data.num,
//         shortTitle: kaliInfo.data.shortTitle,
//         texte_de_base: dilaInfo.texteBaseId[0],
//         title: kaliInfo.data.title,
//         url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=" + kaliInfo.data.id,
//       });
//     }
//   }
//   for (const cc of ccEnTrop) {
//     const element = dataJson.find(ccIndex => ccIndex.num === cc.num);
//     if (element) {
//       const index = dataJson.indexOf(element);
//       dataJson.splice(index, 1);
//       fs.unlinkSync(`../data/${element.id}.json`);
//     }
//   }
//   fs.writeFileSync(process.cwd() + "/data/index.json", JSON.stringify(dataJson, null, 2), "utf-8");
// }

// main();
