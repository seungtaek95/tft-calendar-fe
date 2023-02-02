import { useState } from 'react';
import DailyStatTooltip from './DailyStatTooltip';
import './DateTableBody.css'; 

function DateTableBody({ dayOfMonth, dailyMatchStatView }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const style = {
    background: dailyMatchStatView ? dailyMatchStatView.rgbString : "#FFFFFF"
  }

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
    <td className='calendarCellContainer' style={style}>
      <div className='calendarCell' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className='calendarCellDayText'>{dayOfMonth}</div>
      </div>
      {dailyMatchStatView && <DailyStatTooltip show={showTooltip} dailyMatchStatView={dailyMatchStatView} />}
    </td>
  )
}

export default DateTableBody;
