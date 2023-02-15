import { ENV } from "../../constant/constant";

const baseUrl = `${ENV.host}/api/summoners`;

export async function findSummoner(summonerName) {
  const res = await fetch(`${baseUrl}/${summonerName}`, { method: 'GET' });
  const body = await res.json();

  if (!res.ok) {
    throw body;
  }
  
  body.lastFetchedAt = new Date(body.lastFetchedAt);
  return body;
}

export async function searchSummoner(summonerName) {
  const res = await fetch(`${baseUrl}/${summonerName}/search`, { method: 'POST' });
  const body = await res.json();

  if (!res.ok) {
    throw body;
  }
  
  body.lastFetchedAt = new Date(body.lastFetchedAt);
  return body;
}

export async function renew(summonerNo) {
  const res = await fetch(`${baseUrl}/${summonerNo}/renew`, { method: 'POST' });
  const body = await res.json();

  if (!res.ok) {
    throw body;
  }
  
  return body;
}
