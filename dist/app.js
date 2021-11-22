"use strict";
/*
  Documentation:
  https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
*/
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
var videoModalEl = document.querySelector('#video-modal');
var lastNightScreenEl = document.querySelector('#last-night-screen');
var lastNightGamesButtonEl = document.querySelector('#last-night-games');
var lastNightBackButtonEl = document.querySelector('#last-night-back-button');
var lastNightGameList = document.querySelector('#last-night-game-list');
var lastNightHeadingEl = document.querySelector('#last-night-heading');
var bodyEl = document.body;
var myChart;
var newMyChart;
/**
 * Initializes the app, and different screens
 */
var Init = /** @class */ (function () {
    function Init() {
    }
    /**
     * Initializes the first screen of the app if no team is saved.
     * If a team is saved go to initTeamScreen
     */
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
    /**
     * Starts the process of rendering the team screen.
     * @param id Id of the team to be displayed
     */
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
                        nextGame.date = team.nextGameSchedule.dates[0].date;
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
