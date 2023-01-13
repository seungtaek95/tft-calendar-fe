import { useState } from "react";
import { useParams } from "react-router";
import { getMatchStatBySummonerName } from "../api/match-stat/match-stat-api";

function Summoner() {
  const { summonerName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  
  getMatchStatBySummonerName(summonerName)
    .then(matchStat => {
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
      setIsFailed(true);
    });

  return (
    <div>
      {summonerName}
      {isLoading && <div>Loading...</div>}
      {isFailed && <div>사용자 정보를 가져오는데 실패했습니다.</div>}
    </div>
  );
}

export default Summoner;