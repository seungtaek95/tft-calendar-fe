import './DateTableBody.css'; 

import { useState } from 'react';
import DailyStatTooltip from './DailyStatTooltip';

function DateTableBody({ dayOfMonth, dailyMatchStatView }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const style = dayOfMonth
    ? {
      background: dailyMatchStatView ? dailyMatchStatView.rgbString : "#151515"
    }
    : {}

  const onMouseEnter = () => {
    if (dailyMatchStatView) {
      setShowTooltip(true);
    }
  }

  const onMouseLeave = () => {
    if (showTooltip) {
      setShowTooltip(false);
    }
  }

  return (
    <td className='calendarCellContainer'>
      <div className='calendarCell' style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className='calendarCellDayText'>{dayOfMonth}</div>
      </div>
      {dailyMatchStatView && <DailyStatTooltip show={showTooltip} dailyMatchStatView={dailyMatchStatView} />}
    </td>
  )
}

export default DateTableBody;
