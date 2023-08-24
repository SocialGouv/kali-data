import filter from "unist-util-filter";
import map from "unist-util-map";

import sortByIntOrdre from "../helpers/sortByIntOrdre";

/*
 * Convert a DILA API structure made of metadata and sections|articles children to a [generic AST tree](https://github.com/syntax-tree/unist#nodes)
 */

// convert to syntax-tree format : flatten articles|sections in children
const astify = (node, depth = 0) => ({
    children: [
        ...((node.sections &&
            node.sections.filter(latestVersionFilter).map(node => astify(node, depth + 1))) ||
            []),
        ...((node.articles &&
            node.articles.filter(latestVersionFilter).map(article => ({
                data: article,
                type: "article",
            }))) ||
            []),
    ],
    data: {
        title: node.title,

        ...(depth === 0 && {
            categorisation: node.categorisation,
            shortTitle: (node.categorisation && node.categorisation[0]) || node.title,
            title: node.titre,
        }),

        ...(depth === 0 && node && node.num && { num: parseInt(node.num, 10) }),

        ...(depth > 0 && { cid: node.cid }),
        // eslint-disable-next-line sort-keys-fix/sort-keys-fix
        etat: node.etat,
        id: node.id,
        // add some data
        intOrdre: node.intOrdre,
        ...(node.modifDate && { modifDate: node.modifDate }),
        // add more data when its the root container
    },
    type: depth === 0 ? "convention collective" : "section",
});

export const numify = id => parseInt(id.replace(/^KALI(ARTI|SCTA|TEXT)/, ""));

export const isValidSection = node => !node.etat || node.etat.startsWith("VIGUEUR");

// the API returns all the version of a given article. we pick the latest one
export const latestVersionFilter = (currentArticle, _, articles) => {
    // dont filter out articles without cid
    if (!currentArticle.cid) {
        return true;
    }
    // skip Texte de base
    if (currentArticle.intOrdre === 0) {
        return true;
    }
    const maxVersion = Math.max(
        ...((articles && articles) || [])
            .filter(
                article => article.cid === currentArticle.cid && article.id !== currentArticle.id,
            )
            .map(article => numify(article.id)),
        0,
    );

    return numify(currentArticle.id) > maxVersion;
};

export function cleanAst(tree) {
    const cleanedTree = filter(tree, node => {
        //this is root node
        if (node.type === "convention collective") {
            return true;
        }
        if (["article", "section"].includes(node.type)) {
            return (node.data.etat || "").startsWith("VIGUEUR");
        }

        return false;
    });

    const keys = [
        "cid",
        "num",
        "intOrdre",
        "title",
        "id",
        "content",
        "etat",
        "shortTitle",
        "categorisation",
        "dateParution",
        "surtitre",
        "historique",
        "modifDate",
        "lstLienModification",
    ];

    return map(cleanedTree, ({ type, data: rawData, children }) => {
        const data = keys.reduce((data, key) => {
            if (rawData[key] !== null || rawData[key]) {
                data[key] = rawData[key];
            }

            return data;
        }, {});

        if (children && children.length) {
            children.sort(sortByIntOrdre);

            // eslint-disable-next-line sort-keys-fix/sort-keys-fix
            return { type, data, children };
        } else {
            // eslint-disable-next-line sort-keys-fix/sort-keys-fix
            return { type, data };
        }
    });
}

export default astify;
