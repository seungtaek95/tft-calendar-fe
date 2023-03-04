import './CalendarHeader.css';

import NextButton from './NextButton';
import PrevButton from './PrevButton';

function CalendarHeader({ year, month, onClickPrev, onClickNext, monthlyPlaytimeText }) {
  const disablePrevButton = year === 2023 && month === 1;
  const disableNextButton = year === new Date().getFullYear() && month === new Date().getMonth() + 1;

  console.log(disablePrevButton);
  return (
    <div className="calendar_header">
      <div className="calendar_header_empty">
      </div>
      <div className="calendar_header_center">
        <div className="calendar_year_text">
          {year}
        </div>
        <div className="calendar_month_container">
          <PrevButton disable={disablePrevButton} onClick={onClickPrev}/>
            <div className="calendar_month_text">{month}</div>
          <NextButton disable={disableNextButton} onClick={onClickNext}/>
        </div>
      </div>
      <div className="monthly_playtime_container">
        {monthlyPlaytimeText && (
          <>
            <span>이 달에 체스에 바친 시간</span>
            <br/>
            <span className="monthly_playtime_text">{monthlyPlaytimeText}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default CalendarHeader;
