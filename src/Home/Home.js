import { useRef } from 'react';

function Home() {
  const summonerNameInputRef = useRef(null);
  
  const searchSummoner = () => {
    const summonerName = summonerNameInputRef.current.value;
    if (!summonerName) {
      return alert("소환사명을 입력하세요!");
    }

    window.location.href = `/summoner/${summonerName}`;
  }

  return (
    <div>
      <input ref={summonerNameInputRef} type="text"/>
      <button onClick={searchSummoner}>검색</button>
    </div>
  );
}

export default Home;
