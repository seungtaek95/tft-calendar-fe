import { HOST } from "../../constant/constant";

const baseUrl = `${HOST}/api/match-stats`;

export async function getMonthlyMatchStat(summonerName, year, month) {
  const res = await fetch(`${baseUrl}/summoner/${summonerName}/monthly?year=${year}&month=${month}`);
  const body = await res.json();

  if (!res.ok) {
    throw body;
  }
  
  return body;
}
