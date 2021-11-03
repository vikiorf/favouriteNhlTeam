/*
  Documentation:
  https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
*/

const chooseTeamScreen = document.querySelector(
	'#choose-team-screen'
)! as HTMLElement
const teamScreen = document.querySelector('#team-screen')! as HTMLElement
const selectTeamForm = document.querySelector(
	'#select-team-form'
)! as HTMLInputElement
const teamSelectEl = document.querySelector(
	'#team-select'
)! as HTMLSelectElement

const gameListEl = document.querySelector('#game-list')! as HTMLUListElement
const previousGameLiEl = document.querySelector(
	'#previous-game'
)! as HTMLLIElement
const nextGameLiEl = document.querySelector('#next-game')! as HTMLLIElement
const settingsButtonEl = document.querySelector(
	'#settings-button'
)! as HTMLImageElement
const chosenTeamH1El = document.querySelector(
	'#chosen-team'
)! as HTMLHeadingElement
const winsLossesButtonEl = document.querySelector(
	'#wins-losses'
)! as HTMLInputElement
const graphScreenEl = document.querySelector('#graph-screen')! as HTMLElement
const videoModalEl = document.querySelector('#video-modal')! as HTMLElement
const lastNightScreenEl = document.querySelector(
	'#last-night-screen'
)! as HTMLElement
const lastNightGamesButtonEl = document.querySelector(
	'#last-night-games'
)! as HTMLInputElement
const lastNightBackButtonEl = document.querySelector(
	'#last-night-back-button'
)! as HTMLButtonElement
const lastNightGameList = document.querySelector(
	'#last-night-game-list'
)! as HTMLElement
const lastNightHeadingEl = document.querySelector('#last-night-heading')! as HTMLHeadingElement

let myChart: any
let newMyChart: any

interface TeamItem {
	abbreviation: string
	active: boolean
	conference: object
	division: object
	firstYearOfPlay: string
	franchise: object
	franchiseId: number
	id: number
	link: string
	locationName: string
	name: string
	officialSiteUrl: string
	shortName: string
	teamName: string
	venue: object
	previousGameSchedule: {
		dates: [
			{
				date: string
				games: [
					{
						gamePk: string
					}
				]
			}
		]
	}
	nextGameSchedule: {
		dates: [
			{
				date: string
				games: [
					{
						gamePk: string
					}
				]
			}
		]
	}
}

interface GameItem {
	currentPeriod: number
	currentPeriodOrdinal: string
	currentPeriodTimeRemaining: string
	hasShootout: boolean
	intermissionInfo: object
	periods: object[]
	powerPlayStrength: string
	shootoutInfo: object
	teams: {
		away: {
			goaliePulled: boolean
			goals: number
			numSkaters: number
			powerplay: boolean
			shotsOnGoal: number
			team: {
				name: string
				id: number
			}
		}
		home: {
			goaliePulled: boolean
			goals: number
			numSkaters: number
			powerplay: boolean
			shotsOnGoal: number
			team: {
				name: string
				id: number
			}
		}
	}
	video: string
	id: string
	date: string
}

interface StandingsTeamRecordItem {
	leagueRecord: {
		losses: number
		ot: number
		type: string
		wins: number
	}
	team: {
		id: number
	}
}

interface StandingsRecordItem {
	conference: object
	division: object
	league: object
	standingsType: string
	teamRecords: [StandingsTeamRecordItem]
}

/**
 * Initializes the app, and different screens
 */
class Init {
  /**
   * Initializes the first screen of the app if no team is saved.
   * If a team is saved go to initTeamScreen
   */
	async initChooseTeamScreen(): Promise<void> {
		if (!UserInfo.favouriteTeam) {
			const render = new Render()
			render.renderChooseTeamScreen()
		} else {
			this.initTeamScreen(UserInfo.favouriteTeam.id)
		}
	}
  
  /**
   * Starts the process of rendering the team screen.
   * @param id Id of the team to be displayed
   */
  async initTeamScreen(id: number): Promise<void> {
		const api = new Api()
		const render = new Render()

		const team: TeamItem = await api.fetchAndReturnTeam(id)

		const previousGame: GameItem = await api.fetchAndReturnGame(
			team.previousGameSchedule.dates[0].games[0].gamePk
		)
		const nextGame: GameItem = await api.fetchAndReturnGame(
			team.nextGameSchedule.dates[0].games[0].gamePk
		)

		nextGame.date = team.nextGameSchedule.dates[0].date

		render.renderTeamScreen(previousGame, nextGame)
	}
}

const init = new Init()
init.initChooseTeamScreen()

selectTeamForm.addEventListener('submit', (e) => {
	e.preventDefault()
	init.initTeamScreen(parseInt(teamSelectEl.value))
	const userInfo = new UserInfo()
	userInfo.setFavouriteTeam(parseInt(teamSelectEl.value))
})
settingsButtonEl.addEventListener('click', () => {
	const render = new Render()
	render.renderChooseTeamScreen()
})
winsLossesButtonEl.addEventListener('click', () => {
	const render = new Render()
	render.renderGraphScreen()
})
lastNightGamesButtonEl.addEventListener('click', () => {
	const render = new Render()
	render.renderLastNightGames()
})
lastNightBackButtonEl.addEventListener('click', () => {
	init.initTeamScreen(UserInfo.favouriteTeam.id)
})
