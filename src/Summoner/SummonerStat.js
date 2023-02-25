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

  const [year, setYear] = useState(now.year);
  const [month, setMonth] = useState(now.month);
  const [monthlyPlaytimeText, setMonthlyPlaytimeText] = useState(null);
  const [dailyMatchStatByDayOfMonth, setDailyMatchStatByDayOfMonth] = useState(null);

  // 소환사의 월간 매치 통계 조회
  // 캐시에 있으면 캐시 사용. 없으면 조회 후 캐싱
  async function fetchMonthlyStat(year, month) {
    // const isCacheExist = !!getFromCache(summonerView.puuid, year, month);
    const isCacheExist = false;

    // 월간 매치 통계 조회
    const monthlyMatchStat = isCacheExist
      ? getFromCache(summonerView.puuid, year, month)
      : await getMonthlyMatchStat(summonerView.name, year, month);

    // 현재 년월 데이터가 아닌 경우에만 캐싱
    if (!isCacheExist && !(now.year === year && now.month === month)) {
      saveCache(summonerView.puuid, monthlyMatchStat);
    }

    setIsLoading(false);
    setYear(year);
    setMonth(month);
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

  useEffect(() => {
    if (summonerView.lastFetchedAt) {
      setIsLoading(true);
      fetchMonthlyStat(targetDate.year, targetDate.month)
        .catch(e => {
          console.error(e);
          setIsLoading(false);
          setIsFailed(true);
        });
    } else {
      setIsLoading(false);
    }
  }, [summonerView]);

  const onClickPrev = () => {
    targetDate.minusMonth();
    setIsLoading(true);
    fetchMonthlyStat(targetDate.year, targetDate.month)
      .catch(e => {
        console.error(e);
        setIsLoading(false);
        setIsFailed(true);
      });
  }

  const onClickNext = () => {
    targetDate.plusMonth();
    setIsLoading(true);
    fetchMonthlyStat(targetDate.year, targetDate.month)
      .catch(e => {
        console.error(e);
        setIsLoading(false);
        setIsFailed(true);
      });
  }

  return (
    <>
      {isFailed && <div>통계정보를 가져오는데 실패했습니다ㅠ</div>}
      {!summonerView.lastFetchedAt && <div>통계정보가 없는 소환사입니다!</div>}
      {summonerView.lastFetchedAt && (
        <Calendar
          isLoading={isLoading}
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
