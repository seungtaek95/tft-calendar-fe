import { getLastFetchedAtText } from "../util/StatUtil";

function SummonerInfo({summonerName, lastFetchedAt}) {
  return (
    <div>
      <div>
        {summonerName}
      </div>
      <div>
        <button>통계 갱신</button> {lastFetchedAt && `마지막 갱신: ${getLastFetchedAtText(lastFetchedAt)}`}
      </div>
    </div>
  )
}

export default SummonerInfo;
