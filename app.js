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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
var chooseTeamScreen = document.querySelector('#choose-team-screen');
var teamScreen = document.querySelector('#team-screen');
var selectTeamForm = document.querySelector('#select-team-form');
var teamSelectEl = document.querySelector('#team-select');
var gameListEl = document.querySelector('#game-list');
var previousGameLiEl = document.querySelector('#previous-game');
var nextGameLiEl = document.querySelector('#next-game');
var settingsButtonEl = document.querySelector('#settings-button');
var chosenTeamH1El = document.querySelector('#chosen-team');
var winsLossesButtonEl = document.querySelector('#wins-losses');
var graphScreenEl = document.querySelector('#graph-screen');
var graphBackButtonEl = document.querySelector('#graph-back');
var graphEl = document.querySelector('#myChart');
var videoModalEl = document.querySelector('#video-modal');
var lastNightScreenEl = document.querySelector('#last-night-screen');
var lastNightGamesButtonEl = document.querySelector('#last-night-games');
var lastNightBackButtonEl = document.querySelector('#last-night-back-button');
var lastNightGameList = document.querySelector('#last-night-game-list');
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
    UserInfo.prototype.markGameAsWatched = function (id) {
        var games = __spreadArray([], UserInfo.watchedGames, true);
        var foundGameId = games.findIndex(function (gameId) { return gameId === id; });
        if (foundGameId === -1) {
            games.push(id);
            UserInfo.watchedGames = games;
            localStorage.setItem('watched-games', JSON.stringify(games));
        }
    };
    UserInfo.prototype.checkIfGameIsWatched = function (gameId) {
        var watched = UserInfo.watchedGames.findIndex(function (_gameId) { return _gameId === gameId; });
        if (watched === -1) {
            return false;
        }
        else {
            return true;
        }
    };
    UserInfo.favouriteTeam = JSON.parse(localStorage.getItem('favourite-team'))
        ? JSON.parse(localStorage.getItem('favourite-team'))
        : null;
    UserInfo.watchedGames = JSON.parse(localStorage.getItem('watched-games'))
        ? JSON.parse(localStorage.getItem('watched-games'))
        : [];
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
var Render = /** @class */ (function () {
    function Render() {
    }
    Render.prototype.createGameItemWithScore = function (gameItem, screen) {
        return __awaiter(this, void 0, void 0, function () {
            var api, gameLiEl, awayTeamPEl, homeTeamPEl, atCharacterPEl, awayTeamScorePEl, homeTeamScorePEl, awayTeam, homeTeam, userInfo, watchedGame;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new Api();
                        gameLiEl = document.createElement('li');
                        awayTeamPEl = document.createElement('p');
                        homeTeamPEl = document.createElement('p');
                        atCharacterPEl = document.createElement('p');
                        awayTeamScorePEl = document.createElement('p');
                        homeTeamScorePEl = document.createElement('p');
                        gameLiEl.classList.add('game-item');
                        homeTeamScorePEl.classList.add('third-column');
                        return [4 /*yield*/, api.fetchAndReturnTeam(gameItem.teams.away.team.id)];
                    case 1:
                        awayTeam = _a.sent();
                        return [4 /*yield*/, api.fetchAndReturnTeam(gameItem.teams.home.team.id)];
                    case 2:
                        homeTeam = _a.sent();
                        awayTeamPEl.textContent = awayTeam.abbreviation;
                        homeTeamPEl.textContent = homeTeam.abbreviation;
                        atCharacterPEl.textContent = '@';
                        userInfo = new UserInfo();
                        watchedGame = userInfo.checkIfGameIsWatched(gameItem.id);
                        if (!watchedGame) {
                            awayTeamScorePEl.textContent = '*';
                            homeTeamScorePEl.textContent = '*';
                        }
                        else {
                            awayTeamScorePEl.textContent = gameItem.teams.away.goals.toString();
                            homeTeamScorePEl.textContent = gameItem.teams.home.goals.toString();
                        }
                        gameLiEl.addEventListener('click', function () {
                            _this.changeVideoModalEl(gameItem.video, screen);
                            userInfo.markGameAsWatched(gameItem.id);
                        });
                        gameLiEl.append(awayTeamPEl);
                        gameLiEl.append(atCharacterPEl);
                        gameLiEl.append(homeTeamPEl);
                        gameLiEl.append(awayTeamScorePEl);
                        gameLiEl.append(homeTeamScorePEl);
                        return [2 /*return*/, gameLiEl];
                }
            });
        });
    };
    Render.prototype.changeVideoModalEl = function (video, backString) {
        var videoEl = document.createElement('video');
        var sourceEl = document.createElement('source');
        var backButtonEl = document.createElement('button');
        // Removes the modal
        backButtonEl.addEventListener('click', function () {
            var init = new Init();
            videoModalEl.style.display = 'none';
            if (backString === 'teamscreen') {
                init.initTeamScreen(UserInfo.favouriteTeam.id);
            }
            else if ('last-night') {
                var render = new Render();
                render.renderLastNightGames();
            }
            videoModalEl.innerHTML = '';
        });
        backButtonEl.textContent = 'Back';
        videoEl.setAttribute('controls', '');
        videoEl.setAttribute('width', '250');
        sourceEl.setAttribute('src', video);
        sourceEl.setAttribute('type', 'video/mp4');
        videoEl.append(sourceEl);
        videoModalEl.innerHTML = '';
        videoModalEl.append(backButtonEl);
        videoModalEl.append(videoEl);
        videoModalEl.style.display = 'grid';
    };
    Render.prototype.createGameItemWithoutScore = function (nextGame) {
        return __awaiter(this, void 0, void 0, function () {
            var api, newNextGameLiEl, nextGameAwayTeam, nextGameHomeTeam, nextGameAwayTeamPEl, nextGameHomeTeamPEl, atCharacterPEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new Api();
                        newNextGameLiEl = document.createElement('li');
                        newNextGameLiEl.classList.add('game-item');
                        return [4 /*yield*/, api.fetchAndReturnTeam(nextGame.teams.away.team.id)];
                    case 1:
                        nextGameAwayTeam = _a.sent();
                        return [4 /*yield*/, api.fetchAndReturnTeam(nextGame.teams.home.team.id)];
                    case 2:
                        nextGameHomeTeam = _a.sent();
                        nextGameAwayTeamPEl = document.createElement('p');
                        nextGameHomeTeamPEl = document.createElement('p');
                        atCharacterPEl = document.createElement('p');
                        nextGameAwayTeamPEl.textContent = nextGameAwayTeam.abbreviation;
                        nextGameHomeTeamPEl.textContent = nextGameHomeTeam.abbreviation;
                        atCharacterPEl.textContent = '@';
                        newNextGameLiEl.append(nextGameAwayTeamPEl);
                        newNextGameLiEl.append(atCharacterPEl);
                        newNextGameLiEl.append(nextGameHomeTeamPEl);
                        return [2 /*return*/, newNextGameLiEl];
                }
            });
        });
    };
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
            var previousGameEl, nextGameEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createGameItemWithScore(previousGame, 'teamscreen')];
                    case 1:
                        previousGameEl = _a.sent();
                        return [4 /*yield*/, this.createGameItemWithoutScore(nextGame)];
                    case 2:
                        nextGameEl = _a.sent();
                        gameListEl.innerHTML = '';
                        gameListEl.append(previousGameEl);
                        gameListEl.append(nextGameEl);
                        // this.changeNextGameLiEl(nextGame)
                        chosenTeamH1El.textContent = UserInfo.favouriteTeam.name;
                        lastNightScreenEl.style.display = 'none';
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
    Render.prototype.renderLastNightGames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, time, api, yesterdayDate, fetchedGames;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastNightScreenEl.style.display = 'flex';
                        teamScreen.style.display = 'none';
                        date = new Date();
                        time = new Time();
                        api = new Api();
                        return [4 /*yield*/, time.calculateAndReturnLastYesterdayDate(date)];
                    case 1:
                        yesterdayDate = _a.sent();
                        return [4 /*yield*/, api.fetchAndReturnGamesFromDate(yesterdayDate)];
                    case 2:
                        fetchedGames = _a.sent();
                        lastNightGameList.innerHTML = '';
                        fetchedGames.forEach(function (game) { return __awaiter(_this, void 0, void 0, function () {
                            var gameItem, gameLiEl;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, api.fetchAndReturnGame(game.gamePk)];
                                    case 1:
                                        gameItem = _a.sent();
                                        return [4 /*yield*/, this.createGameItemWithScore(gameItem, 'last-night')];
                                    case 2:
                                        gameLiEl = _a.sent();
                                        lastNightGameList.append(gameLiEl);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
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
lastNightGamesButtonEl.addEventListener('click', function () {
    var render = new Render();
    render.renderLastNightGames();
});
lastNightBackButtonEl.addEventListener('click', function () {
    init.initTeamScreen(UserInfo.favouriteTeam.id);
});
graphBackButtonEl.addEventListener('click', function () {
    init.initTeamScreen(UserInfo.favouriteTeam.id);
});
