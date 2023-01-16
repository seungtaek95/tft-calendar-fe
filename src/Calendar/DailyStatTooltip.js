import { getSumPlaytimeText } from "../util/StatUtil";
import './DailyStatTooltip.css';

function DailyStatTooltip({ show, dailyMatchStat }) {
  return (
    <div className="dailyStatTooltip" style={{ display: show ? 'block' : 'none' }}>
      <div>플레이 수: {dailyMatchStat.playedGameCount}</div>
      <div>플레이타임: {getSumPlaytimeText(dailyMatchStat.playtimeInSeconds)}</div>
      <div>평균 순위: {parseFloat(dailyMatchStat.averagePlacement.toFixed(2))}</div>
    </div>
  )
}

export default DailyStatTooltip;
