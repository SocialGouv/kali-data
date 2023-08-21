import DilaApiClient from "@socialgouv/dila-api-client";
import { DilaResponse } from "./types";

const dilaApi = new DilaApiClient();

export async function getKaliInfoWithCcNumber(idccNumber: string): Promise<DilaResponse | null> {
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
      console.error(`For ${idccNumber}`);
      console.error(err);
      return null;
    });
  return result;
}

export async function getKaliInfoWithKaliContainerId(
  containerId: string,
  idccNumber: number,
): Promise<DilaResponse | null> {
  if (!process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET) {
    throw new Error("OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET is not defined");
  }
  const result = await dilaApi
    .fetch({
      method: "POST",
      params: {
        id: containerId,
      },
      path: "consult/kaliCont",
    })
    .catch((err: any) => {
      console.error(`For ${containerId} ${idccNumber}`);
      console.error(err);
      return null;
    });

  return result;
}
