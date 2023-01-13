import { useState } from "react";
import { useParams } from "react-router";

function Summoner() {
  const { summonerName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  fetch(`http://localhost/api/match-stat/summoner/${summonerName}/monthly?year=2022&month=3`)
    .then(res => res.json())
    .then(stat => {
      setIsLoading(false);
    })
    .catch(console.error);

  return (
    <div>
      {summonerName}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default Summoner;