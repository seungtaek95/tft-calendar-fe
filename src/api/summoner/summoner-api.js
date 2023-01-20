const baseUrl = "http://localhost/api/summoners";

export async function searchSummoner(summonerName) {
  const res = await fetch(`${baseUrl}/${summonerName}/search`, { method: 'POST' });
  const body = await res.json();

  if (!res.ok) {
    throw body;
  }
  
  return body;
}