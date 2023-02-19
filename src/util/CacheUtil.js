export function saveCache(summonerPuuid, monthlyMatchStat) {
  const year = monthlyMatchStat.year;
  const month = monthlyMatchStat.month;

  const existSummonerCache = JSON.parse(sessionStorage.getItem(summonerPuuid));
  if (existSummonerCache) {
    if (!existSummonerCache[year]) {
      existSummonerCache[year] = {};
    }
    existSummonerCache[year][month] = monthlyMatchStat;
    sessionStorage.setItem(summonerPuuid, JSON.stringify(existSummonerCache));
  } else {
    const summonerCache = {
      [year]: {
        [month]: monthlyMatchStat
      }
    };
    sessionStorage.setItem(summonerPuuid, JSON.stringify(summonerCache));
  }
}

export function getFromCache(summonerPuuid, year, month) {
  return JSON.parse(sessionStorage.getItem(summonerPuuid))?.[year]?.[month];
}
