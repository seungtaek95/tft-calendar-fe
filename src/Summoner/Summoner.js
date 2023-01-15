import { useState } from "react";
import { useParams } from "react-router";

import { getMatchStatBySummonerName } from "../api/match-stat/match-stat-api";
import Calendar from "../Calendar/Calendar";

const now = new Date();

function Summoner() {
  const { summonerName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  getMatchStatBySummonerName(summonerName)
    .then(matchStat => {
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
      setIsFailed(true);
    });
  
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
        {summonerName}
      </div>
      {isLoading && <div>Loading...</div>}
      {isFailed && <div>사용자 정보를 가져오는데 실패했습니다.</div>}
      {!isLoading && !isFailed && <Calendar year={year} month={month} onClickPrev={onClickPrev} onClickNext={onClickNext} />}
    </div>
  );
}

export default Summoner;
