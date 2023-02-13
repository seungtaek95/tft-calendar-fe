import { HOST } from "../../constant/constant";

const baseUrl = `${HOST}/api/summoners`;

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
