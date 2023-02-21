import './Home.css';

import { useRef } from 'react';
import { ENV } from '../constant/constant';
import Footer from '../Footer/Footer';

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
  console.log(ENV);

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
        <div className='sample_user_text'>
          sample: <a className='sample_user_tag' href='/summoner/쨍 이'>쨍 이</a> <a className='sample_user_tag' href='/summoner/토쟁이는한강으로'>토쟁이는한강으로</a> <a className='sample_user_tag' href='/summoner/안녕안녕나는유미'>안녕안녕나는유미</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
