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
var settingsButtonEl = document.querySelector('#settings-button');
var chosenTeamH1El = document.querySelector('#chosen-team');
var winsLossesButtonEl = document.querySelector('#wins-losses');
var graphScreenEl = document.querySelector('#graph-screen');
var graphBackButtonEl = document.querySelector('#graph-back');
var graphEl = document.querySelector('#myChart');
var myChart;
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    UserInfo.prototype.setFavouriteTeam = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var api, team;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new Api();
                        return [4 /*yield*/, api.fetchAndReturnTeam(key)];
                    case 1:
                        team = _a.sent();
                        UserInfo.favouriteTeam = team;
                        localStorage.setItem('favourite-team', JSON.stringify(team));
                        return [2 /*return*/];
                }
            });
        });
    };
    UserInfo.favouriteTeam = JSON.parse(localStorage.getItem('favourite-team'))
        ? JSON.parse(localStorage.getItem('favourite-team'))
        : null;
    return UserInfo;
}());
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
    Api.prototype.fetchAndReturnGame = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var game;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://statsapi.web.nhl.com/api/v1/game/" + id + "/linescore")
                            .then(function (res) { return res.json(); })
                            .then(function (res) { return res; })];
                    case 1:
                        game = _a.sent();
                        return [2 /*return*/, game];
                }
            });
        });
    };
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
                            wins: '',
                            losses: '',
                            overtime: ''
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
    return Api;
}());
var Render = /** @class */ (function () {
    function Render() {
    }
    Render.prototype.renderChooseTeamScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api, teams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chooseTeamScreen.style.display = 'flex';
                        teamScreen.style.display = 'none';
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
    Render.prototype.renderTeamScreen = function (previousGame, nextGame) {
        return __awaiter(this, void 0, void 0, function () {
            var api, previousGameAwayTeam, previousGameHomeTeam, previousGameAwayTeamPEl, previousGameHomeTeamPEl, previousGameAwayGoalsPEl, previousGameHomeGoalsPEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new Api();
                        return [4 /*yield*/, api.fetchAndReturnTeam(previousGame.teams.away.team.id)];
                    case 1:
                        previousGameAwayTeam = _a.sent();
                        return [4 /*yield*/, api.fetchAndReturnTeam(previousGame.teams.home.team.id)];
                    case 2:
                        previousGameHomeTeam = _a.sent();
                        previousGameAwayTeamPEl = document.createElement('p');
                        previousGameHomeTeamPEl = document.createElement('p');
                        previousGameAwayGoalsPEl = document.createElement('p');
                        previousGameHomeGoalsPEl = document.createElement('p');
                        previousGameAwayTeamPEl.textContent = previousGameAwayTeam.abbreviation;
                        previousGameHomeTeamPEl.textContent = previousGameHomeTeam.abbreviation;
                        previousGameAwayGoalsPEl.textContent = previousGame.teams.away.goals.toString();
                        previousGameHomeGoalsPEl.textContent = previousGame.teams.home.goals.toString();
                        previousGameLiEl.append(previousGameAwayTeamPEl);
                        previousGameLiEl.append(previousGameHomeTeamPEl);
                        previousGameLiEl.append(previousGameAwayGoalsPEl);
                        previousGameLiEl.append(previousGameHomeGoalsPEl);
                        // previousGameLiEl.textContent = `${previousGameAwayTeam.abbreviation}: ${previousGame.teams.away.goals} @ ${previousGameHomeTeam.abbreviation}: ${previousGame.teams.home.goals}`
                        nextGameLiEl.textContent = nextGame.teams.away.team.name + " @ " + nextGame.teams.home.team.name;
                        chosenTeamH1El.textContent = UserInfo.favouriteTeam.name;
                        chooseTeamScreen.style.display = 'none';
                        graphScreenEl.style.display = 'none';
                        teamScreen.style.display = 'flex';
                        return [2 /*return*/];
                }
            });
        });
    };
    Render.prototype.renderGraphScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api, winsLosses, labels, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chooseTeamScreen.style.display = 'none';
                        teamScreen.style.display = 'none';
                        graphEl.style.display = 'block';
                        graphScreenEl.style.display = 'block';
                        if (myChart)
                            myChart.destroy();
                        api = new Api();
                        return [4 /*yield*/, api.fetchAndReturnTeamWinsAndLosses(UserInfo.favouriteTeam.id)];
                    case 1:
                        winsLosses = _a.sent();
                        if (winsLosses.overtime) {
                            labels = ['Wins', 'Losses', 'Overtime'];
                        }
                        else {
                            labels = ['Wins', 'Losses'];
                        }
                        data = [winsLosses.wins, winsLosses.losses, winsLosses.overtime];
                        myChart = new Chart(graphEl, {
                            type: 'bar',
                            data: {
                                labels: labels,
                                datasets: [
                                    {
                                        label: '# of Games',
                                        data: data,
                                        backgroundColor: [
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }
                                ]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Render;
}());
var Init = /** @class */ (function () {
    function Init() {
    }
    Init.prototype.initChooseTeamScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var render;
            return __generator(this, function (_a) {
                if (!UserInfo.favouriteTeam) {
                    render = new Render();
                    render.renderChooseTeamScreen();
                }
                else {
                    this.initTeamScreen(UserInfo.favouriteTeam.id);
                }
                return [2 /*return*/];
            });
        });
    };
    Init.prototype.initTeamScreen = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var api, render, team, previousGame, nextGame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new Api();
                        render = new Render();
                        return [4 /*yield*/, api.fetchAndReturnTeam(id)];
                    case 1:
                        team = _a.sent();
                        return [4 /*yield*/, api.fetchAndReturnGame(team.previousGameSchedule.dates[0].games[0].gamePk)];
                    case 2:
                        previousGame = _a.sent();
                        return [4 /*yield*/, api.fetchAndReturnGame(team.nextGameSchedule.dates[0].games[0].gamePk)];
                    case 3:
                        nextGame = _a.sent();
                        render.renderTeamScreen(previousGame, nextGame);
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
    var userInfo = new UserInfo();
    userInfo.setFavouriteTeam(parseInt(teamSelectEl.value));
});
settingsButtonEl.addEventListener('click', function () {
    var render = new Render();
    render.renderChooseTeamScreen();
});
winsLossesButtonEl.addEventListener('click', function () {
    var render = new Render();
    render.renderGraphScreen();
});
graphBackButtonEl.addEventListener('click', function () {
    var init = new Init();
    init.initTeamScreen(UserInfo.favouriteTeam.id);
});
