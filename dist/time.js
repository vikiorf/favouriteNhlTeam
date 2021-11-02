"use strict";
var Time = /** @class */ (function () {
    function Time() {
    }
    Time.prototype.calculateAndReturnLastYesterdayDate = function (date) {
        var formattedDate = date.toISOString().split('T')[0];
        var splitDate = formattedDate.split('-');
        var day = parseInt(splitDate[2]);
        var month = parseInt(splitDate[1]);
        var year = parseInt(splitDate[0]);
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
        return year + "-" + month + "-" + day;
    };
    return Time;
}());
