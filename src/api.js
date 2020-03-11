import DilaApiClient from "@socialgouv/dila-api-client";

const dilaApi = new DilaApiClient();

// fetch a kali container using its containerId (ex: KALICONT000005635191)
export async function getKaliCont(containerId) {
  return await dilaApi.fetch({
    path: "consult/kaliCont",
    method: "POST",
    params: {
      id: containerId
    }
  });
}

// fetch a kali container using its idcc (ex: 1090)
export async function getKaliContIdcc(idcc) {
  return await dilaApi.fetch({
    path: "consult/kaliContIdcc",
    method: "POST",
    params: {
      id: idcc
    }
  });
}

// fetch kali text using its textId (ex: KALITEXT000005685156)
export async function getKaliText(textId) {
  return await dilaApi.fetch({
    path: "consult/kaliText",
    method: "POST",
    params: {
      id: textId
    }
  });
}
