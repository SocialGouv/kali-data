import fs = require("fs");
import dataJson = require("../data/index.json");
import { getInfosCcs, getInfosCcsSansLiens } from "./infos";
import { getKaliInfoWithKaliContainerId } from "./api";
import { KaliInfo } from "./types";

async function ajoutCcAvecLiens() {
    const ccs = getInfosCcs();
    const copyDataJson = [...dataJson];
    for (const cc of ccs) {
        const fileName = process.cwd() + `/data/${cc.id}.json`;
        if (!fs.existsSync(fileName)) {
            console.log(`Convention collective ${cc.num} non présente`);
            const dilaInfo = await getKaliInfoWithKaliContainerId(cc.id, cc.num);
            if (dilaInfo) {
                const kaliInfo: KaliInfo = {
                    type: "convention collective",
                    data: {
                        num: cc.num,
                        id: dilaInfo.id,
                        title: dilaInfo.titre,
                        shortTitle:
                            (dilaInfo.categorisation && dilaInfo.categorisation[0]) ??
                            dilaInfo.titre,
                        categorisation: dilaInfo.categorisation ?? [],
                    },
                    children: [],
                };
                fs.writeFileSync(fileName, JSON.stringify(kaliInfo, null, 4), "utf-8");
                copyDataJson.push({
                    active: true,
                    etat: dilaInfo.sections[0].etat,
                    id: kaliInfo.data.id,
                    nature: dilaInfo.nature,
                    num: cc.num,
                    shortTitle: kaliInfo.data.shortTitle,
                    texte_de_base: dilaInfo.texteBaseId[0],
                    title: kaliInfo.data.title,
                    url:
                        "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=" +
                        kaliInfo.data.id,
                });
            }
        } else {
            console.log(
                `Convention collective ${cc.num} déjà présente avec comme container id ${cc.id}}`,
            );
            if (!copyDataJson.find(ccJson => ccJson.num === cc.num)) {
                const dilaInfo = await getKaliInfoWithKaliContainerId(cc.id, cc.num);
                if (dilaInfo) {
                    const kaliInfo: KaliInfo = {
                        type: "convention collective",
                        data: {
                            num: cc.num,
                            id: dilaInfo.id,
                            title: dilaInfo.titre,
                            shortTitle:
                                (dilaInfo.categorisation && dilaInfo.categorisation[0]) ??
                                dilaInfo.titre,
                            categorisation: dilaInfo.categorisation ?? [],
                        },
                        children: [],
                    };
                    fs.writeFileSync(fileName, JSON.stringify(kaliInfo, null, 4), "utf-8");
                }
            }
        }
    }
    fs.writeFileSync(
        process.cwd() + "/data/index.json",
        JSON.stringify(copyDataJson, null, 4),
        "utf-8",
    );
}

async function ajoutCcSansLiens() {
    const ccs = getInfosCcsSansLiens();
    const copyDataJson = [...dataJson];
    for (const cc of ccs) {
        const index = copyDataJson.findIndex(ccJson => ccJson.num === cc.num);
        if (index === -1) {
            copyDataJson.push({
                active: true,
                num: cc.num,
                shortTitle: cc.name,
                title: cc.name,
            } as any);
        } else if (copyDataJson[index].id === undefined) {
            copyDataJson[index] = {
                active: true,
                num: cc.num,
                shortTitle: cc.name,
                title: cc.name,
            };
        }
    }
    fs.writeFileSync(
        process.cwd() + "/data/index.json",
        JSON.stringify(copyDataJson, null, 4),
        "utf-8",
    );
}

async function main() {
    // ajoutCcAvecLiens()
    ajoutCcSansLiens();
}

main();
