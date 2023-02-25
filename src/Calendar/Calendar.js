import './Calendar.css';
import './PrevNextButton.css';

import DateUtil from "../util/DateUtil";
import * as StatUtil from "../util/StatUtil";
import DateTableBody from "./DateTableBody";
import CalendarHeader from './CalendarHeader';
import DimmedLayer from '../common/DimmedLayer';
import { useRef } from 'react';

const dateTexts = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ isLoading, year, month, onClickPrev, onClickNext, dailyMatchStatByDayOfMonth, monthlyPlaytimeText }) {
  const now = new DateUtil(year, month);
  const lastDayOfMonth = now.lastDayOfMonth;

  const calenderContainerRef = useRef(null);

  const renderCalendarTableBody = () => {
    const bodyRows = [];
    let dayOfMonth = 1 - now.firstDay;

    // 주별로
    for (let week = 1; week <= 6; week++) {
      const tds = [];

      // 요일별로
      for (let day = 0; day < 7; day++) {
        if (1 <= dayOfMonth && dayOfMonth <= lastDayOfMonth) {
          const dailyMatchStat = dailyMatchStatByDayOfMonth && dailyMatchStatByDayOfMonth[dayOfMonth];
          tds.push(<DateTableBody key={`${month}-${week}-${day}`} dayOfMonth={dayOfMonth} dailyMatchStatView={dailyMatchStat && StatUtil.getDailyMatchStatView(dailyMatchStat)} />);
        } else {
          tds.push(<DateTableBody key={`${month}-${week}-${day}`} />);
        }
        dayOfMonth++;
      }

      bodyRows.push(<tr key={`${month}-${week}`}>{tds}</tr>);

      if (dayOfMonth > lastDayOfMonth) {
        break;
      }
    }

    return (
      <tbody>
        {bodyRows}
      </tbody>
    )
  }

  return (
    <div className="calendar_container" ref={calenderContainerRef}>
      {isLoading && <DimmedLayer width={calenderContainerRef.current?.clientWidth || 0} height={calenderContainerRef.current?.clientHeight || 0} />}
      <CalendarHeader year={year} month={month} onClickPrev={onClickPrev} onClickNext={onClickNext} monthlyPlaytimeText={monthlyPlaytimeText} />
      <table className='calendar_table'>
        <thead>
          <tr>
            {dateTexts.map(dateText => <th key={dateText}>{dateText}</th>)}
          </tr>
        </thead>
        {renderCalendarTableBody()}
      </table>
    </div>
  );
}

export default Calendar;
