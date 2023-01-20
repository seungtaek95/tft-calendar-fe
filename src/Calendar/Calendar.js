import DateUtil from "../util/DateUtil";
import * as StatUtil from "../util/StatUtil";
import DateTableBody from "./DateTableBody";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

const dateTexts = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ year, month, onClickPrev, onClickNext, dailyMatchStatByDayOfMonth }) {
  const now = new DateUtil(year, month);
  const lastDayOfMonth = now.lastDayOfMonth;

  const renderCalendarBody = () => {
    const elems = [];
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

      elems.push(<tr key={`${month}-${week}`}>{tds}</tr>);

      if (dayOfMonth > lastDayOfMonth) {
        break;
      }
    }

    return elems;
  }

  return (
    <>
      <div>
        {now.year}
      </div>
      <div>
        <PrevButton onClick={onClickPrev}/>{now.month}<NextButton onClick={onClickNext}/>
      </div>
      <table>
        <thead>
          <tr>
            {dateTexts.map(dateText => <th key={dateText}>{dateText}</th>)}
          </tr>
        </thead>
        <tbody>
          {renderCalendarBody()}
        </tbody>
      </table>
    </>
  );
}

export default Calendar;
