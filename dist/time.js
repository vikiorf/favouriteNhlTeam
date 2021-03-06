"use strict";
/**
 * Class that handles time variables and calculations
 */
var Time = /** @class */ (function () {
    function Time() {
    }
    /**
     * Returns the date the day before the inserted date as a string
     * @param date Date day before return date
     * @returns Date day before inserted date
     */
    Time.prototype.calculateAndReturnLastYesterdayDate = function (date) {
        var formattedDate = date.toISOString().split('T')[0];
        var splitDate = formattedDate.split('-');
        var day = parseInt(splitDate[2]);
        var month = parseInt(splitDate[1]);
        var year = parseInt(splitDate[0]);
        // If the day is the first of the month, it adjusts the month, day and, if needed, the year.
        if (day === 1) {
            month = month - 1;
            switch (month) {
                case 0:
                    month = 12;
                    day = 31;
                    year = year - 1;
                    break;
                case 1:
                    day = 31;
                    break;
                case 2:
                    day = 28;
                    break;
                case 3:
                    day = 31;
                    break;
                case 4:
                    day = 30;
                    break;
                case 5:
                    day = 31;
                    break;
                case 6:
                    day = 30;
                    break;
                case 7:
                    day = 31;
                    break;
                case 8:
                    day = 31;
                    break;
                case 9:
                    day = 30;
                    break;
                case 10:
                    day = 31;
                    break;
                case 11:
                    day = 30;
                    break;
                case 12:
                    day = 31;
                    break;
            }
        }
        else {
            day = day - 1;
        }
        var formattedDay = this.checkIfDateNeedsZero(day);
        var formattedMonth = this.checkIfDateNeedsZero(month);
        return year + "-" + formattedMonth + "-" + formattedDay;
    };
    /**
     * Adds zero to date which is lower than 10. Example: "2" becomes "02"
     * @param date Number which is tied to date, e.g month or day
     * @returns string with added zero to date if required
     */
    Time.prototype.checkIfDateNeedsZero = function (date) {
        var formattedDate;
        if (date < 10) {
            formattedDate = '0' + date.toString();
        }
        else {
            formattedDate = date.toString();
        }
        return formattedDate;
    };
    return Time;
}());
