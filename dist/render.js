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
/**
 * Handles all the rendering for the app
 */
var Render = /** @class */ (function () {
    function Render() {
    }
    /**
     * Creates an li-element with scores hidden if the game is not yet watched
     * or, if the game is watched, scores
     * @param gameItem The game that needs an element
     * @param screen Which screen that should be rendered when clicking back on video-modal
     * @returns An li-element with scores either hidden or displayed
     */
    Render.prototype.createGameItemWithScore = function (gameItem, screen) {
        return __awaiter(this, void 0, void 0, function () {
            var api, gameLiEl, awayTeamPEl, homeTeamPEl, atCharacterPEl, awayTeamScorePEl, homeTeamScorePEl, overtimeSoPEl, awayTeam, homeTeam, userInfo, watchedGame;
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
                        overtimeSoPEl = document.createElement('p');
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
                        // If the game is not watched, hide scores else display scores
                        if (!watchedGame) {
                            awayTeamScorePEl.textContent = '*';
                            homeTeamScorePEl.textContent = '*';
                        }
                        else {
                            awayTeamScorePEl.textContent = gameItem.teams.away.goals.toString();
                            homeTeamScorePEl.textContent = gameItem.teams.home.goals.toString();
                            // Checking if game went to overtime or penalty shots
                            if (gameItem.hasShootout) {
                                overtimeSoPEl.textContent = 'SO';
                            }
                            else if (gameItem.periods.length === 4) {
                                overtimeSoPEl.textContent = 'OT';
                            }
                        }
                        gameLiEl.addEventListener('click', function () {
                            _this.changeVideoModalEl(gameItem.video, screen);
                            userInfo.markGameAsWatched(gameItem.id);
                        });
                        gameLiEl.append(awayTeamPEl);
                        gameLiEl.append(atCharacterPEl);
                        gameLiEl.append(homeTeamPEl);
                        gameLiEl.append(awayTeamScorePEl);
                        gameLiEl.append(overtimeSoPEl);
                        gameLiEl.append(homeTeamScorePEl);
                        return [2 /*return*/, gameLiEl];
                }
            });
        });
    };
    /**
     * Changes the content and displays the video-modal.
     * Displays a video and a backbutton
     * @param video string-link of the video for the game
     * @param backString Which screen to be rendered when clicking back
     */
    Render.prototype.changeVideoModalEl = function (video, backString) {
        var _this = this;
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
                _this.renderLastNightGames();
            }
            videoModalEl.innerHTML = '';
        });
        backButtonEl.textContent = 'Back';
        videoEl.setAttribute('controls', '');
        if (window.innerWidth > 1100) {
            videoEl.setAttribute('width', '1000');
        }
        else {
            videoEl.setAttribute('width', '250');
        }
        sourceEl.setAttribute('src', video);
        sourceEl.setAttribute('type', 'video/mp4');
        videoEl.append(sourceEl);
        videoModalEl.innerHTML = '';
        videoModalEl.append(backButtonEl);
        videoModalEl.append(videoEl);
        videoModalEl.style.display = 'grid';
    };
    /**
     * Creates an li-element with hometeam, awayteam and date for
     * when the game is set to be played
     * @param game Game which does not require score to be displayed
     * @returns LI-element with hometeam, awayteam and date for the game
     */
    Render.prototype.createGameItemWithoutScore = function (game) {
        return __awaiter(this, void 0, void 0, function () {
            var api, newNextGameLiEl, nextGameAwayTeam, nextGameHomeTeam, nextGameAwayTeamPEl, nextGameHomeTeamPEl, atCharacterPEl, datePEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new Api();
                        newNextGameLiEl = document.createElement('li');
                        newNextGameLiEl.classList.add('game-item');
                        return [4 /*yield*/, api.fetchAndReturnTeam(game.teams.away.team.id)];
                    case 1:
                        nextGameAwayTeam = _a.sent();
                        return [4 /*yield*/, api.fetchAndReturnTeam(game.teams.home.team.id)];
                    case 2:
                        nextGameHomeTeam = _a.sent();
                        nextGameAwayTeamPEl = document.createElement('p');
                        nextGameHomeTeamPEl = document.createElement('p');
                        atCharacterPEl = document.createElement('p');
                        datePEl = document.createElement('p');
                        datePEl.classList.add('second-column');
                        nextGameAwayTeamPEl.textContent = nextGameAwayTeam.abbreviation;
                        nextGameHomeTeamPEl.textContent = nextGameHomeTeam.abbreviation;
                        atCharacterPEl.textContent = '@';
                        datePEl.textContent = game.date;
                        newNextGameLiEl.append(nextGameAwayTeamPEl);
                        newNextGameLiEl.append(atCharacterPEl);
                        newNextGameLiEl.append(nextGameHomeTeamPEl);
                        newNextGameLiEl.append(datePEl);
                        return [2 /*return*/, newNextGameLiEl];
                }
            });
        });
    };
    /**
     * Displays first screen and hides the other screens.
     * Calls for all teams and add them to the select as an option
     */
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
    /**
     * Creates an item for each parameter and appends them to teamscreen.
   * Displays screen and hides other screens
     * @param previousGame The previous game from TeamItem
     * @param nextGame The next game from TeamItem
     */
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
    /**
     * Method which calls for a teams wins and losses then
     * renders a graph based on the result
     */
    Render.prototype.renderGraphScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api, winsLosses, labels, data, newMyChartEl, backButtonEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chooseTeamScreen.style.display = 'none';
                        teamScreen.style.display = 'none';
                        graphScreenEl.style.display = 'block';
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
                        newMyChartEl = document.createElement('canvas');
                        if (window.innerWidth > 1100) {
                            newMyChartEl.setAttribute('height', '150');
                        }
                        else if (window.innerWidth > 800) {
                            newMyChartEl.setAttribute('height', '200');
                        }
                        else {
                            newMyChartEl.setAttribute('height', '500');
                        }
                        newMyChartEl.setAttribute('width', '400');
                        newMyChart = new Chart(newMyChartEl, {
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
                        backButtonEl = document.createElement('button');
                        backButtonEl.setAttribute('id', 'graph-back');
                        backButtonEl.textContent = 'Back';
                        backButtonEl.addEventListener('click', function () {
                            init.initTeamScreen(UserInfo.favouriteTeam.id);
                        });
                        graphScreenEl.innerHTML = '';
                        graphScreenEl.append(backButtonEl);
                        graphScreenEl.append(newMyChartEl);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Method which calls for all games played last night and creates an element
     * for them then appends them to the game-list
     */
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
                        yesterdayDate = time.calculateAndReturnLastYesterdayDate(date);
                        return [4 /*yield*/, api.fetchAndReturnGamesFromDate(yesterdayDate)];
                    case 1:
                        fetchedGames = _a.sent();
                        lastNightHeadingEl.textContent = yesterdayDate;
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
