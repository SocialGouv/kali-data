import dilaClient from "../dila-client";

export const getCCNContainer = id =>
  dilaClient.fetch({
    path: "consult/kaliCont",
    method: "POST",
    params: {
      id
    }
  });
