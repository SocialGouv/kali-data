import fs from "fs";
import log from "npmlog";
import pPipe from "p-pipe";
import path from "path";
import { promisify } from "util";

import { getAgreements } from "../src";

log.enableColor();

const writeFile = promisify(fs.writeFile);

const t0 = Date.now();

function cleanAgreements(agreementId) {
    const agreement = require(`../data/${agreementId}.json`);

    return {
        ...agreement,
        children: [],
    };
}

async function saveFile(container) {
    await writeFile(
        path.join(__dirname, "..", "data", `${container.data.id}.json`),
        JSON.stringify(container, 0, 2),
    );
    log.verbose("clean()", `Updating ${container.data.id}.json`);
}

function toFix(value, nb = 2) {
    const digit = Math.pow(10, nb);

    return Math.round(value * digit) / digit;
}

async function main() {
    const pipelineClean = pPipe(cleanAgreements, saveFile);

    const INDEXED_AGREEMENTS = await getAgreements();

    const notSupportedCcnList = INDEXED_AGREEMENTS.filter(
        convention => !!convention.url && !convention.fetchArticles,
    );

    const pClean = notSupportedCcnList.map(({ id }) => {
        return pipelineClean(id).catch(error => {
            log.error("clean()", `clean failed for ${id}`);
            throw error;
        });
    });
    await Promise.all(pClean);
    log.info("clean()", `Clean done in ${toFix((Date.now() - t0) / 1000)} s`);
}

main().catch(error => {
    log.error("clean()", `Failed in ${toFix((Date.now() - t0) / 1000)} s (${error})`);

    process.exit(-1);
});
