const ONE_HOUR = 3_600;
const TWO_HOUR = 7_200;
const THREE_HOUR = 10_800;
const FOUR_HOUR = 14_400;
const FIVE_HOUR = 18_000;
const SIX_HOUR = 21_600;

export function getRgbString(playtimeInSeconds) {
  if (playtimeInSeconds === 0) {
    return "#FFFFFF";
  } else if (playtimeInSeconds < ONE_HOUR) {
    return "#FFCCCC";
  } else if (playtimeInSeconds < TWO_HOUR) {
    return "#FF9999";
  } else if (playtimeInSeconds < THREE_HOUR) {
    return "#FF6666";
  } else if (playtimeInSeconds < FOUR_HOUR) {
    return "#FF3333";
  } else if (playtimeInSeconds < FIVE_HOUR) {
    return "#FF0000";
  } else if (playtimeInSeconds < SIX_HOUR) {
    return "CC0000";
  }

  return "#990000";
}

export function getSumPlaytimeText(sumPlaytimeInSeconds) {
  const hour = Math.floor(sumPlaytimeInSeconds / ONE_HOUR);
  const minute = Math.floor((sumPlaytimeInSeconds % ONE_HOUR) / 60);
  const second = 0;

  let resultString = "";
  if (hour > 0) {
    resultString += `${hour} 시간 `;
  }
  if (minute > 0) {
    resultString += `${minute} 분 `;
  }
  if (second > 0) {
    resultString += `${second} 초`;
  }

  return resultString;
}
