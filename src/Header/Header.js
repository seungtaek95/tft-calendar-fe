import './Header.css';

import { useRef } from "react";

function Header() {
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
    <div className="header">
      <div className="header_container">
        <div className="header_search_container">
          <input className="summoner_name_input" ref={summonerNameInputRef} onKeyDown={onKeyDown} type="text"/>
          <button className="search_name_button" onClick={searchSummoner}>검색</button>
        </div>
      </div>
    </div>
  )
}

export default Header;
