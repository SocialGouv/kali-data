import xlsx from "node-xlsx";
import fs = require("fs");
import csv = require("csv-parser");
import dataJson = require("../data/index.json");
import { Diff, ConventionCollective } from "./types";

export function getDifferenceBetweenDataAndDares(): Diff {
    const workSheetsFromFile = xlsx.parse(`${__dirname}/data-cc/dares.xlsx`);

    const supportedCcXlsx: ConventionCollective[] = [];

    workSheetsFromFile[0].data.forEach((row: string[]) => {
        const ccNumber = parseInt(row[0]);
        const ccName = row[1];
        if (ccNumber && ccName) {
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

export function getDifferenceBetweenDataAndWeez(): Promise<Diff> {
    return new Promise((resolve, reject) => {
        const supportedCcXlsx: ConventionCollective[] = [];

        fs.createReadStream(__dirname + "/data-cc/weez.csv")
            .pipe(csv())
            .on("data", data => {
                const ccNumber = parseInt(data.IDCC);
                if (ccNumber && !supportedCcXlsx.find(cc => cc.num === ccNumber)) {
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

export function getDifferenceBetweenVerificationFileAndIndex(): Diff {
    const workSheetsFromFile = xlsx.parse(`${__dirname}/data-cc/verify_cc.xlsx`);

    const supportedCcXlsx: ConventionCollective[] = [];

    workSheetsFromFile[0].data.forEach((row: string[]) => {
        const ccNumber = parseInt(row[0]);
        const ccName = row[1];
        const ccLink = row[3];
        if (ccNumber && ccName && ccLink) {
            const ccNameWithoutParenthesis = ccName.replace(/\(.*annexée.*\)/gi, "").trim();
            supportedCcXlsx.push({
                name: ccNameWithoutParenthesis,
                num: ccNumber,
                link: ccLink,
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
