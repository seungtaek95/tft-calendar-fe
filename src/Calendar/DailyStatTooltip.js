import './DailyStatTooltip.css';

function DailyStatTooltip({ show, dailyMatchStatView }) {
  return (
    <div className="dailyStatTooltip" style={{ display: show ? 'block' : 'none' }}>
      <div>플레이 수: {dailyMatchStatView.playedGameCount}</div>
      <div>플레이타임: {dailyMatchStatView.sumPlaytimeInSeconds}</div>
      <div>평균 순위: {dailyMatchStatView.averagePlacement}</div>
    </div>
  )
}

export default DailyStatTooltip;
