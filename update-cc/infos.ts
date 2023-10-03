import xlsx from "node-xlsx";
import { IdccBaseInfo, IdccInfo } from "./types";
import { isLink } from "./utils";

export function getInfosCcs(): IdccInfo[] {
    const workSheetsFromFile = xlsx.parse(`${__dirname}/data-cc/idcc_liens.xlsx`);

    const ccs: IdccInfo[] = [];

    workSheetsFromFile[0].data.forEach((row: string[]) => {
        const ccNumber = parseInt(row[0]);
        const ccName = row[1];
        const ccLink = row[3];
        if (ccNumber && ccName && isLink(ccLink)) {
            const ccNameWithoutParenthesis = ccName.replace(/\(.*annexée.*\)/gi, "").trim();
            const id = ccLink.split("/").pop() ?? "";
            ccs.push({
                name: ccNameWithoutParenthesis,
                num: ccNumber,
                link: ccLink,
                id,
            });
        }
    });

    return ccs;
}

export function getInfosCcsSansLiens(): IdccBaseInfo[] {
    const workSheetsFromFile = xlsx.parse(`${__dirname}/data-cc/idcc_sans_liens.xlsx`);

    const ccs: IdccBaseInfo[] = [];

    workSheetsFromFile[0].data.forEach((row: string[]) => {
        const ccNumber = parseInt(row[0]);
        const ccName = row[1];
        if (ccNumber && ccName) {
            const ccNameWithoutParenthesis = ccName.trim();
            ccs.push({
                name: ccNameWithoutParenthesis,
                num: ccNumber,
            });
        }
    });

    return ccs;
}
