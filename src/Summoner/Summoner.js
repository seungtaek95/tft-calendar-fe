import './Summoner.css';

import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { findSummoner } from "../api/summoner/summoner-api";
import Header from "../Header/Header";
import SummonerInfo from "./SummonerInfo";
import SummonerStat from "./SummonerStat";

function Summoner() {  
  const { summonerName } = useParams();
  const [summonerView, setSummonerView] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  // 소환사 이름으로 소환사 정보 조회
  useEffect(() => {
    async function fetchSummoner() {
      const summonerView = await findSummoner(summonerName);
      setIsLoading(false);
      setSummonerView(summonerView);
    }

    fetchSummoner()
      .catch(e => {
        setIsLoading(false);
        setIsFailed(true);
      });
  }, [summonerName]);

  if (isLoading || isFailed) {
    return (
      <>
        <Header />
        <div className="summoner_container">
          {isLoading && <div>Loading...</div>}
          {isFailed && (
            <div>
              <p>소환사 정보를 가져오는데 실패했습니다ㅠ</p>
              <p>{summonerName}</p>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="summoner_container">
        <SummonerInfo summonerView={summonerView} />
        <SummonerStat summonerView={summonerView} />
      </div>
    </>
  );
}

export default Summoner;
