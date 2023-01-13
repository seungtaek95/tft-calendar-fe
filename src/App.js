import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  const summonerNameInputRef = useRef(null);
  const [monthlyStat, setMonthlyStat] = useState(null);

  const searchSummoner = () => {
    fetch(`http://localhost/api/match-stat/summoner/${summonerNameInputRef.current.value}/monthly?year=2022&month=3`)
      .then(res => res.json().then(setMonthlyStat))
      .catch(console.error);
  }

  if (monthlyStat) {
    console.log(monthlyStat);
  }

  return (
    <div>
      <input ref={summonerNameInputRef} type="text"/>
      <button onClick={searchSummoner}>검색</button>
      {monthlyStat && monthlyStat.puuid}
    </div>
  );
}

export default App;
