const baseUrl = "http://localhost/api/match-stat";

export async function getMatchStatBySummonerName(summonerName) {
  const today = new Date();

  const res = await fetch(`${baseUrl}/summoner/${summonerName}/monthly?year=${today.getFullYear()}&month=${today.getMonth() + 1}`);
  const body = await res.json();

  if (!res.ok) {
    throw new Error(body);
  }
  
  return body;
}
