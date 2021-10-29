// https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
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

const previousGameLiEl = document.querySelector('#previous-game')! as HTMLLIElement
const nextGameLiEl = document.querySelector('#next-game')! as HTMLLIElement

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
	nextGameSchedule: string
	previousGameSchedule: string
}

let homeTeamData: Object
let awayTeamData: Object
fetch(
	'https://statsapi.web.nhl.com/api/v1/teams/14?expand=team.schedule.next&expand=team.schedule.previous'
)
	.then((res) => res.json())
	.then((res) => {
		// console.log(res)
	})

fetch('https://statsapi.web.nhl.com/api/v1/standings')
	.then((res) => res.json())
	.then((res) => {
		console.log('standings', res)
	})

async function hej() {
	await fetch('https://statsapi.web.nhl.com/api/v1/game/2021020102/feed/live')
		.then((res) => res.json())
		.then((res) => {
			// console.log(res)
			// console.log(res.liveData.boxscore.teams)
			homeTeamData = res.liveData.boxscore.teams.home
			awayTeamData = res.liveData.boxscore.teams.away
		})

	// console.log(homeTeamData.teamStats)
	// console.log(awayTeamData.teamStats)
}

class Api {
	async fetchAndReturnTeams(): Promise<TeamItem[]> {
		const teams: TeamItem[] = await fetch(
			'https://statsapi.web.nhl.com/api/v1/teams'
		)
			.then((res) => res.json())
			.then((res) => {
				return res.teams
			})
		console.log('teams', teams)
		return teams
	}

	async fetchAndReturnTeam(id: number): Promise<TeamItem> {
		const team: TeamItem = await fetch(
			`https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.schedule.next&expand=team.schedule.previous`
		)
			.then((res) => res.json())
			.then((res) => {
				return res.teams[0]
			})
		return team
	}

	async fetchAndReturnGame(link: string): Promise<object> {
		let game = await fetch(`https://statsapi.web.nhl.com/api/v1/game/${link}/linescore`)
			.then((res) => res.json())
			.then((res) => res)
		return game
	}
}

class Init {
	async initChooseTeamScreen() {
		const api = new Api()

		const teams = await api.fetchAndReturnTeams()
		teams.forEach((team) => {
			const optionEl = document.createElement('option')
			optionEl.textContent = team.name
			optionEl.value = team.id.toString()
			teamSelectEl.append(optionEl)
		})
	}
	async initTeamScreen(id: number) {
		const api = new Api()
		const team: TeamItem = await api.fetchAndReturnTeam(id)
		console.log('team', team.nextGameSchedule.dates[0].games[0].gamePk)
		const previousGame = await api.fetchAndReturnGame(
			team.previousGameSchedule.dates[0].games[0].gamePk
		)
    const nextGame = await api.fetchAndReturnGame(team.nextGameSchedule.dates[0].games[0].gamePk)
    console.log('previousGame', previousGame)
    console.log('nextGame', nextGame)
    previousGameLiEl.textContent = `${previousGame.teams.away.team.name}: ${previousGame.teams.away.goals} @ ${previousGame.teams.home.team.name}: ${previousGame.teams.home.goals}`

    nextGameLiEl.textContent = `${nextGame.teams.away.team.name} @ ${nextGame.teams.home.team.name}`
		chooseTeamScreen.style.display = 'none'
		teamScreen.style.display = 'block'
	}
}

const init = new Init()
init.initChooseTeamScreen()

selectTeamForm.addEventListener('submit', (e) => {
	e.preventDefault()
	init.initTeamScreen(parseInt(teamSelectEl.value))
})
