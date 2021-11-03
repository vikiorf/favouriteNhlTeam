"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Api = /** @class */ (function () {
    function Api() {
    }
    /**
     * Fetches all teams currently playing in the NHL
     * @returns All teams in the NHL
     */
    Api.prototype.fetchAndReturnTeams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var teams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://statsapi.web.nhl.com/api/v1/teams')
                            .then(function (res) { return res.json(); })
                            .then(function (res) {
                            return res.teams;
                        })];
                    case 1:
                        teams = _a.sent();
                        return [2 /*return*/, teams];
                }
            });
        });
    };
    /**
     * Fetches a team from the id and returns chosen team
     * @param id Team Id
     * @returns Chosen team as TeamItem
     */
    Api.prototype.fetchAndReturnTeam = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var team;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://statsapi.web.nhl.com/api/v1/teams/" + id + "?expand=team.schedule.next&expand=team.schedule.previous")
                            .then(function (res) { return res.json(); })
                            .then(function (res) {
                            return res.teams[0];
                        })];
                    case 1:
                        team = _a.sent();
                        return [2 /*return*/, team];
                }
            });
        });
    };
    /**
     * Fetches the chosen game and media for the chosen game
     * @param id Game Id
     * @returns Game along with media for the game
     */
    Api.prototype.fetchAndReturnGame = function (id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var game, hej;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch("https://statsapi.web.nhl.com/api/v1/game/" + id + "/linescore")
                            .then(function (res) { return res.json(); })
                            .then(function (res) { return res; })];
                    case 1:
                        game = _b.sent();
                        return [4 /*yield*/, fetch("https://statsapi.web.nhl.com/api/v1/game/" + id + "/content")
                                .then(function (res) { return res.json(); })
                                .then(function (res) { return res; })];
                    case 2:
                        hej = _b.sent();
                        game.video = (_a = hej.media.epg[3].items[0]) === null || _a === void 0 ? void 0 : _a.playbacks[3].url;
                        game.id = id;
                        return [2 /*return*/, game];
                }
            });
        });
    };
    /**
     * Fetches wins and losses and overtime for the chosen team
     * @param teamId Id of the team
     * @returns Wins and losses for the chosen team
     */
    Api.prototype.fetchAndReturnTeamWinsAndLosses = function (teamId) {
        return __awaiter(this, void 0, void 0, function () {
            var records, winsLosses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://statsapi.web.nhl.com/api/v1/standings?expand=standings.record")
                            .then(function (res) { return res.json(); })
                            .then(function (res) {
                            return res.records;
                        })];
                    case 1:
                        records = _a.sent();
                        winsLosses = {
                            wins: 0,
                            losses: 0,
                            overtime: 0
                        };
                        records.forEach(function (record) {
                            record.teamRecords.forEach(function (teamRecord) {
                                if (teamRecord.team.id === teamId) {
                                    winsLosses.wins = teamRecord.leagueRecord.wins;
                                    winsLosses.losses = teamRecord.leagueRecord.losses;
                                    winsLosses.overtime = teamRecord.leagueRecord.ot;
                                }
                            });
                        });
                        return [2 /*return*/, winsLosses];
                }
            });
        });
    };
    /**
     * Returns all games played at the certain date
     * @param date Date as a string
     * @returns Games from the chosen date
     */
    Api.prototype.fetchAndReturnGamesFromDate = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://statsapi.web.nhl.com/api/v1/schedule?date=" + date)
                            .then(function (res) { return res.json(); })
                            .then(function (res) { return res.dates[0].games; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Api;
}());
