import DilaApiClient from "@socialgouv/dila-api-client";

const dilaApi = new DilaApiClient();

// fetch a kali container using its containerId (ex: KALICONT000005635191)
export async function getKaliCont(containerId) {
  return await dilaApi
    .fetch({
      path: "consult/kaliCont",
      method: "POST",
      params: {
        id: containerId,
      },
    })
    .then(checkApiResponse);
}

// fetch a kali container using its idcc (ex: 1090)
export function getKaliContIdcc(idcc) {
  return dilaApi
    .fetch({
      path: "consult/kaliContIdcc",
      method: "POST",
      params: {
        id: idcc,
      },
    })
    .then(checkApiResponse);
}

// fetch kali text using its textId (ex: KALITEXT000005685156)
export function getKaliText(textId) {
  return dilaApi
    .fetch({
      path: "consult/kaliText",
      method: "POST",
      params: {
        id: textId,
      },
    })
    .then(checkApiResponse);
}

function checkApiResponse(data) {
  if (Object.keys(data).length === 1) {
    throw new Error(`invalid response for text ${data.id}`, data);
  }
  return data;
}
