import { useRef } from 'react';

function Home() {
  const summonerNameInputRef = useRef(null);
  
  const searchSummoner = () => {
    window.location.href = `/summoner/${summonerNameInputRef.current.value}`;
  }

  return (
    <div>
      <input ref={summonerNameInputRef} type="text"/>
      <button onClick={searchSummoner}>검색</button>
    </div>
  );
}

export default Home;
