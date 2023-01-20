import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getMonthlyMatchStat } from "../api/match-stat/match-stat-api";
import { searchSummoner } from "../api/summoner/summoner-api";
import Calendar from "../Calendar/Calendar";
import { getLastFetchedAtText, getSumPlaytimeText } from "../util/StatUtil";

const now = new Date();

function Summoner() {
  const { summonerName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [isNew, setIsNew] = useState(false);
  const [lastFetchedAt, setLastFetchedAt] = useState(null);

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [monthlyMatchStat, setMonthlyMatchStat] = useState(null);
  const [monthlySumPlaytime, setMonthlySumPlaytime] = useState(0);
  const [dailyMatchStatByDayOfMonth, setDailyMatchStatByDayOfMonth] = useState(null);

  useEffect(() => {
    async function init() {
      const searchSummonerResponse = await searchSummoner(summonerName);

      if (searchSummonerResponse.isNew) {
        setIsLoading(false);
        setIsNew(true);
        return;
      }

      const monthlyMatchStat = await getMonthlyMatchStat(summonerName, year, month + 1);

      setIsLoading(false);
      setIsNew(false);
      setLastFetchedAt(new Date(searchSummonerResponse.summonerView.lastFetchedAt));
      setMonthlyMatchStat(monthlyMatchStat);
      setMonthlySumPlaytime(
        monthlyMatchStat.dailyMatchStats.reduce((acc, dailyMatchStat) => acc += dailyMatchStat.playtimeInSeconds, 0)
      );
      setDailyMatchStatByDayOfMonth(
        monthlyMatchStat.dailyMatchStats.reduce((dailyMatchStatByDayOfMonth, dailyMatchStat) => {
          dailyMatchStatByDayOfMonth[dailyMatchStat.dayOfMonth] = dailyMatchStat;
          return dailyMatchStatByDayOfMonth;
        }, {})
      );
    }

    init()
      .catch(e => {
        console.error(e);
        setIsLoading(false);
        setIsFailed(true);
      });
  }, [year, month]);
  
  const onClickPrev = () => {
    now.setMonth(now.getMonth() - 1);
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setIsLoading(true);
    setDailyMatchStatByDayOfMonth(null);
  }

  const onClickNext = () => {
    now.setMonth(now.getMonth() + 1);
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setIsLoading(true);
    setDailyMatchStatByDayOfMonth(null);
  }

  return (
    <div>
      <div>
        {summonerName}
      </div>
      {isLoading && <div>Loading...</div>}
      {isFailed && <div>사용자 정보를 가져오는데 실패했습니다.</div>}
      {!isLoading && !isFailed && isNew && (
        <div>신규 소환사입니다!</div>
      )}
      {!isLoading && !isFailed && monthlyMatchStat && (
        <div>
          <div>
            <button>통계 갱신</button> 마지막 갱신: {getLastFetchedAtText(lastFetchedAt)}
          </div>
          <div>
            <div>이달의 날려버린 시간: {getSumPlaytimeText(monthlySumPlaytime)}</div>
            <Calendar
              year={year}
              month={month}
              onClickPrev={onClickPrev}
              onClickNext={onClickNext}
              dailyMatchStatByDayOfMonth={dailyMatchStatByDayOfMonth} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Summoner;
