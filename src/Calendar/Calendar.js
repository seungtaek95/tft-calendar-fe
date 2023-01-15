import { DateUtil } from "../util/DateUtil";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

const dateTexts = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ year, month, onClickPrev, onClickNext }) {
  const now = new DateUtil(year, month);
  const lastDayOfMonth = now.lastDayOfMonth;

  const renderCalendarBody = () => {
    const elems = [];
    let dayOfMonth = 1;

    // 주별로
    for (let week = 1; week <= 5; week++) {
      if (dayOfMonth > lastDayOfMonth) { // 2월은 4주만 있는 경우가 있기 때문에
        return elems;
      }

      const tds = [];

      // 요일별로
      for (let day = 0; day < 7; day++) {
        if (week === 1) { // 첫째 주
          if (day >= now.firstDay) {
            tds.push(<td key={`${week}-${day}`}>{dayOfMonth++}</td>);
          } else {
            tds.push(<td key={`${week}-${day}`}></td>)
          }
        } else {
          if (dayOfMonth <= lastDayOfMonth) {
            tds.push(<td key={`${week}-${day}`}>{dayOfMonth++}</td>);
          } else {
            tds.push(<td key={`${week}-${day}`}></td>);
          }
        }
      }

      elems.push(<tr key={`${month}-${week}`}>{tds}</tr>);
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
