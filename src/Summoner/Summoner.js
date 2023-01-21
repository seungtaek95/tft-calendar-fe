import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { searchSummoner } from "../api/summoner/summoner-api";
import Header from "../Header/Header";
import SummonerInfo from "./SummonerInfo";
import SummonerStat from "./SummonerStat";

function Summoner() {  
  const { summonerName } = useParams();
  const [lastFetchedAt, setLastFetchedAt] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    async function fetchSummoner() {
      const summonerView = await searchSummoner(summonerName);
      setIsLoading(false);

      if (summonerView.lastFetchedAt) {
        setLastFetchedAt(new Date(summonerView.lastFetchedAt));
      }
    }

    fetchSummoner()
      .catch(e => {
        console.error(e);
        setIsLoading(false);
        setIsFailed(true);
      });
  }, []);

  if (isLoading || isFailed) {
    return (
      <div>
        <Header />
        {isLoading && <div>Loading...</div>}
        {isFailed && (
          <div>
            <p>소환사 정보를 가져오는데 실패했습니다ㅠ</p>
            <p>{summonerName}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <SummonerInfo summonerName={summonerName} lastFetchedAt={lastFetchedAt} />
      <SummonerStat summonerName={summonerName} lastFetchedAt={lastFetchedAt} />
    </div>
  );
}

export default Summoner;
