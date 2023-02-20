import './SummonerStat.css';

import { useEffect, useState } from "react";

import Calendar from "../Calendar/Calendar";
import { getMonthlyMatchStat } from "../api/match-stat/match-stat-api";
import { getSumPlaytimeText } from "../util/StatUtil";
import { getFromCache, saveCache } from '../util/CacheUtil';
import DateUtil from '../util/DateUtil';

const now = new DateUtil();
const targetDate = new DateUtil();

function SummonerStat({ summonerView }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [year, setYear] = useState(targetDate.year);
  const [month, setMonth] = useState(targetDate.month);
  const [monthlyPlaytimeText, setMonthlyPlaytimeText] = useState(null);
  const [dailyMatchStatByDayOfMonth, setDailyMatchStatByDayOfMonth] = useState(null);

  // 소환사의 월간 매치 통계 조회
  useEffect(() => {
    // 캐시에 있으면 캐시 사용. 없으면 조회 후 캐싱
    async function fetchMonthlyStat() {
      const isCacheExist = !!getFromCache(summonerView.puuid, year, month);

      const monthlyMatchStat = isCacheExist
        ? getFromCache(summonerView.puuid, year, month)
        : await getMonthlyMatchStat(summonerView.name, year, month);

      // 현재 년월 데이터가 아닌 경우에만 캐싱
      if (!isCacheExist && (now.year !== targetDate.year || now.month !== targetDate.month)) {
        saveCache(summonerView.puuid, monthlyMatchStat);
      }

      setIsLoading(false);
      setMonthlyPlaytimeText(
        getSumPlaytimeText(monthlyMatchStat.dailyMatchStats.reduce((acc, dailyMatchStat) => acc += dailyMatchStat.playtimeInSeconds, 0))
      );
      setDailyMatchStatByDayOfMonth(
        monthlyMatchStat.dailyMatchStats.reduce((dailyMatchStatByDayOfMonth, dailyMatchStat) => {
          dailyMatchStatByDayOfMonth[dailyMatchStat.dayOfMonth] = dailyMatchStat;
          return dailyMatchStatByDayOfMonth;
        }, {})
      );
    }

    if (summonerView.lastFetchedAt) {
      setIsLoading(true);
      fetchMonthlyStat()
        .catch(e => {
          console.error(e);
          setIsLoading(false);
          setIsFailed(true);
        });
    } else {
      setIsLoading(false);
    }
  }, [summonerView, year, month]);

  const onClickPrev = () => {
    targetDate.minusMonth();
    setYear(targetDate.year);
    setMonth(targetDate.month);
    setIsLoading(true);
    setDailyMatchStatByDayOfMonth(null);
  }

  const onClickNext = () => {
    targetDate.plusMonth();
    setYear(targetDate.year);
    setMonth(targetDate.month);
    setIsLoading(true);
    setDailyMatchStatByDayOfMonth(null);
  }

  if (isLoading || isFailed) {
    return (
      <div>
        {isLoading && <div>Loading...</div>}
        {isFailed && <div>통계정보를 가져오는데 실패했습니다ㅠ</div>}
      </div>
    )
  }

  return (
    <>
      {!summonerView.lastFetchedAt && <div>통계정보가 없는 소환사입니다!</div>}
      {summonerView.lastFetchedAt && (
        <Calendar
          year={year}
          month={month}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          dailyMatchStatByDayOfMonth={dailyMatchStatByDayOfMonth}
          monthlyPlaytimeText={monthlyPlaytimeText} />
      )}
    </>
  );
}

export default SummonerStat;
