// @ts-check

var agreementsCache = undefined;

/**
 * Get the full list of indexed agreements.
 *
 * @returns {Promise<KaliData.IndexedAgreement[]>}
 */
async function getAgreements() {
    if (!agreementsCache) {
        const agreements = await fetch(
            "https://cdtnadminprod.blob.core.windows.net/agreements/index.json",
        );
        if (!agreements.ok) {
            throw new Error(
                `Failed to fetch agreements, error: ${agreements.status} - ${agreements.statusText}`,
            );
        }
        const allAgreements = await agreements.json();
        const containsId = convention => typeof convention.id === "string";
        agreementsCache = allAgreements.filter(containsId);
    }

    return agreementsCache;
}

module.exports = getAgreements;
