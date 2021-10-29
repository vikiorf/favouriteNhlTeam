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
// https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
var chooseTeamScreen = document.querySelector('#choose-team-screen');
var teamScreen = document.querySelector('#team-screen');
var selectTeamForm = document.querySelector('#select-team-form');
var teamSelectEl = document.querySelector('#team-select');
var previousGameLiEl = document.querySelector('#previous-game');
var nextGameLiEl = document.querySelector('#next-game');
var homeTeamData;
var awayTeamData;
fetch('https://statsapi.web.nhl.com/api/v1/teams/14?expand=team.schedule.next&expand=team.schedule.previous')
    .then(function (res) { return res.json(); })
    .then(function (res) {
    // console.log(res)
});
fetch('https://statsapi.web.nhl.com/api/v1/standings')
    .then(function (res) { return res.json(); })
    .then(function (res) {
    console.log('standings', res);
});
function hej() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://statsapi.web.nhl.com/api/v1/game/2021020102/feed/live')
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        // console.log(res)
                        // console.log(res.liveData.boxscore.teams)
                        homeTeamData = res.liveData.boxscore.teams.home;
                        awayTeamData = res.liveData.boxscore.teams.away;
                    })
                    // console.log(homeTeamData.teamStats)
                    // console.log(awayTeamData.teamStats)
                ];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var Api = /** @class */ (function () {
    function Api() {
    }
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
                        console.log('teams', teams);
                        return [2 /*return*/, teams];
                }
            });
        });
    };
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
    Api.prototype.fetchAndReturnGame = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            var game;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://statsapi.web.nhl.com/api/v1/game/" + link + "/linescore")
                            .then(function (res) { return res.json(); })
                            .then(function (res) { return res; })];
                    case 1:
                        game = _a.sent();
                        return [2 /*return*/, game];
                }
            });
        });
    };
    return Api;
}());
var Init = /** @class */ (function () {
    function Init() {
    }
    Init.prototype.initChooseTeamScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api, teams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new Api();
                        return [4 /*yield*/, api.fetchAndReturnTeams()];
                    case 1:
                        teams = _a.sent();
                        teams.forEach(function (team) {
                            var optionEl = document.createElement('option');
                            optionEl.textContent = team.name;
                            optionEl.value = team.id.toString();
                            teamSelectEl.append(optionEl);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Init.prototype.initTeamScreen = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var api, team, previousGame, nextGame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new Api();
                        return [4 /*yield*/, api.fetchAndReturnTeam(id)];
                    case 1:
                        team = _a.sent();
                        console.log('team', team.nextGameSchedule.dates[0].games[0].gamePk);
                        return [4 /*yield*/, api.fetchAndReturnGame(team.previousGameSchedule.dates[0].games[0].gamePk)];
                    case 2:
                        previousGame = _a.sent();
                        return [4 /*yield*/, api.fetchAndReturnGame(team.nextGameSchedule.dates[0].games[0].gamePk)];
                    case 3:
                        nextGame = _a.sent();
                        console.log('previousGame', previousGame);
                        console.log('nextGame', nextGame);
                        previousGameLiEl.textContent = previousGame.teams.away.team.name + ": " + previousGame.teams.away.goals + " @ " + previousGame.teams.home.team.name + ": " + previousGame.teams.home.goals;
                        nextGameLiEl.textContent = nextGame.teams.away.team.name + " @ " + nextGame.teams.home.team.name;
                        chooseTeamScreen.style.display = 'none';
                        teamScreen.style.display = 'block';
                        return [2 /*return*/];
                }
            });
        });
    };
    return Init;
}());
var init = new Init();
init.initChooseTeamScreen();
selectTeamForm.addEventListener('submit', function (e) {
    e.preventDefault();
    init.initTeamScreen(parseInt(teamSelectEl.value));
});
