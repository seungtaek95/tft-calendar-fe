import { useState } from 'react';
import DailyStatTooltip from './DailyStatTooltip';
import './DateTableBody.css'; 

function DateTableBody({ dayOfMonth, dailyMatchStatView }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const style = {
    background: dailyMatchStatView ? dailyMatchStatView.rgbString : "#FFFFFF"
  }

  return (
    <td className='calendarCellContainer' style={style}>
      <div className='calendarCell' onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        <div className='calendarCellDayText'>{dayOfMonth}</div>
      </div>
      { dailyMatchStatView && <DailyStatTooltip show={showTooltip} dailyMatchStatView={dailyMatchStatView} />}
    </td>
  )
}

export default DateTableBody;
