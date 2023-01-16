export default class DateUtil {
  constructor(year, month) {
    if (year && month !== null) {
      this.currentDate = new Date(year, month, 1);
    } else if (year) {
      this.currentDate = new Date(year);
    } else if (month) {
      this.currentDate = new Date();
      this.currentDate.setMonth(month);
    } else {
      this.currentDate = new Date();
    }
  }

  get year() {
    return this.currentDate.getFullYear();
  }

  get month() {
    return this.currentDate.getMonth() + 1;
  }

  get dayOfMonth() {
    return this.currentDate.getDate();
  }

  get firstDay() {
    return new Date(this.year, this.month - 1, 1).getDay();
  }

  get lastDay() {
    return new Date(this.year, this.month, 0).getDay();
  }

  get lastDayOfMonth() {
    return new Date(this.year, this.month, 0).getDate();
  }

  minusMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
  }

  plusMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
  }
}