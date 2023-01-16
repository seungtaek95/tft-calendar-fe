import { useState } from 'react';
import { getRgbString } from '../util/StatUtil';
import DailyStatTooltip from './DailyStatTooltip';
import './DateTableBody.css'; 

function DateTableBody({ dayOfMonth, dailyMatchStat }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const style = {
    background: dailyMatchStat ? getRgbString(dailyMatchStat.playtimeInSeconds) : "#FFFFFF"
  }

  return (
    <td className='calendarCellContainer' style={style}>
      <div className='calendarCell' onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        <div className='calendarCellDayText'>{dayOfMonth}</div>
      </div>
      { dailyMatchStat && <DailyStatTooltip show={showTooltip} dailyMatchStat={dailyMatchStat} />}
    </td>
  )
}

export default DateTableBody;
