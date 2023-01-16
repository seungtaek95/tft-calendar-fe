import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getMonthlyMatchStat } from "../api/match-stat/match-stat-api";
import Calendar from "../Calendar/Calendar";
import { getSumPlaytimeText } from "../util/StatUtil";

const now = new Date();

function Summoner() {
  const { summonerName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [monthlyMatchStat, setMonthlyMatchStat] = useState(null);
  const [monthlySumPlaytime, setMonthlySumPlaytime] = useState(0);
  const [dailyMatchStatByDayOfMonth, setDailyMatchStatByDayOfMonth] = useState(null);

  useEffect(() => {
    getMonthlyMatchStat(summonerName, year, month + 1)
      .then(monthlyMatchStat => {
        setIsLoading(false);
        setMonthlyMatchStat(monthlyMatchStat);
        setDailyMatchStatByDayOfMonth(
          monthlyMatchStat.dailyMatchStats.reduce((dailyMatchStatByDayOfMonth, dailyMatchStat) => {
            dailyMatchStatByDayOfMonth[dailyMatchStat.dayOfMonth] = dailyMatchStat;
            return dailyMatchStatByDayOfMonth;
          }, {})
        );
        setMonthlySumPlaytime(
          monthlyMatchStat.dailyMatchStats.reduce((acc, dailyMatchStat) => acc += dailyMatchStat.playtimeInSeconds, 0)
        );
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
        setIsFailed(true);
      });
  }, [year, month]);
  
  const onClickPrev = () => {
    now.setMonth(now.getMonth() - 1);
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }

  const onClickNext = () => {
    now.setMonth(now.getMonth() + 1);
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }

  return (
    <div>
      <div>
        쨍 이
      </div>
      {isLoading && <div>Loading...</div>}
      {isFailed && <div>사용자 정보를 가져오는데 실패했습니다.</div>}
      {!isLoading && !isFailed && (
        <div>
          <div>이달의 날려버린 시간: {getSumPlaytimeText(monthlySumPlaytime)}</div>
          <Calendar
            year={year}
            month={month}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
            dailyMatchStatByDayOfMonth={dailyMatchStatByDayOfMonth} />
        </div>
      )}
    </div>
  );
}

export default Summoner;
