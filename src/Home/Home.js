import './Home.css';

import { useRef } from 'react';
import { ENV } from '../constant/constant';

function Home() {
  const summonerNameInputRef = useRef(null);
  
  const searchSummoner = () => {
    const summonerName = summonerNameInputRef.current.value;
    if (!summonerName) {
      return alert("소환사명을 입력하세요!");
    }

    window.location.href = `/summoner/${summonerName}`;
  }

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchSummoner();
    }
  }

  return (
    <div className='home'>
      <div className='home_body'>
        <div className='home_logo_container'>
          <img className='home_logo' src={`${ENV.host}/home_logo.svg`} alt='home logo' />
        </div>
        <div className='search_name_container'>
          <input className='summoner_name_input' ref={summonerNameInputRef} onKeyDown={onKeyDown} type="text"/>
          <button className='search_name_button' onClick={searchSummoner}>검색</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
