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
const graphBackButtonEl = document.querySelector(
	'#graph-back'
)! as HTMLButtonElement
const graphEl = document.querySelector('#myChart')! as HTMLElement

let myChart: any

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
	periods: []
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

class UserInfo {
	static favouriteTeam: TeamItem = JSON.parse(
		localStorage.getItem('favourite-team')!
	)
		? JSON.parse(localStorage.getItem('favourite-team')!)
		: null

	async setFavouriteTeam(key: number) {
		const api = new Api()
		const team = await api.fetchAndReturnTeam(key)
		UserInfo.favouriteTeam = team
		localStorage.setItem('favourite-team', JSON.stringify(team))
	}
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

	async fetchAndReturnGame(id: string): Promise<GameItem> {
		let game = await fetch(
			`https://statsapi.web.nhl.com/api/v1/game/${id}/linescore`
		)
			.then((res) => res.json())
			.then((res) => res)
		return game
	}

	async fetchAndReturnTeamWinsAndLosses(
		teamId: number
	): Promise<{ wins: number; losses: number; overtime: number }> {
		const records = await fetch(
			`https://statsapi.web.nhl.com/api/v1/standings?expand=standings.record`
		)
			.then((res) => res.json())
			.then((res) => {
				return res.records
			})
		let winsLosses: {
			wins: number,
			losses: number,
			overtime: number
		} = {
      wins: 0,
      losses: 0,
      overtime: 0
    }
		records.forEach((record: StandingsRecordItem) => {
			record.teamRecords.forEach((teamRecord: StandingsTeamRecordItem) => {
        if (teamRecord.team.id === teamId) {
          console.log(teamRecord)
					winsLosses.wins = teamRecord.leagueRecord.wins
					winsLosses.losses = teamRecord.leagueRecord.losses
					winsLosses.overtime = teamRecord.leagueRecord.ot
				}
			})
		})
		return winsLosses
	}
}

class Render {
	async changePreviousGameLiEl(previousGame: GameItem): Promise<void> {
		const api = new Api()
		const previousGameAwayTeam = await api.fetchAndReturnTeam(
			previousGame.teams.away.team.id
		)
		const previousGameHomeTeam = await api.fetchAndReturnTeam(
			previousGame.teams.home.team.id
		)

		const previousGameAwayTeamPEl = document.createElement('p')
		const previousGameHomeTeamPEl = document.createElement('p')
    const atCharacterPEl = document.createElement('p')

		const previousGameAwayGoalsPEl = document.createElement('p')
		const previousGameHomeGoalsPEl = document.createElement('p')
    
    previousGameHomeGoalsPEl.classList.add('third-column')

		previousGameAwayTeamPEl.textContent = previousGameAwayTeam.abbreviation
		previousGameHomeTeamPEl.textContent = previousGameHomeTeam.abbreviation

		previousGameAwayGoalsPEl.textContent =
			previousGame.teams.away.goals.toString()
		previousGameHomeGoalsPEl.textContent =
			previousGame.teams.home.goals.toString()

    atCharacterPEl.textContent = '@'

		previousGameLiEl.innerHTML = ''
		previousGameLiEl.append(previousGameAwayTeamPEl)
		previousGameLiEl.append(atCharacterPEl)
		previousGameLiEl.append(previousGameHomeTeamPEl)
		previousGameLiEl.append(previousGameAwayGoalsPEl)
		previousGameLiEl.append(previousGameHomeGoalsPEl)
	}

	async changeNextGameLiEl(nextGame: GameItem): Promise<void> {
		const api = new Api()
		const nextGameAwayTeam = await api.fetchAndReturnTeam(
			nextGame.teams.away.team.id
		)
		const nextGameHomeTeam = await api.fetchAndReturnTeam(
			nextGame.teams.home.team.id
		)

		const nextGameAwayTeamPEl = document.createElement('p')
		const nextGameHomeTeamPEl = document.createElement('p')
    const atCharacterPEl = document.createElement('p')

		nextGameAwayTeamPEl.textContent = nextGameAwayTeam.abbreviation
		nextGameHomeTeamPEl.textContent = nextGameHomeTeam.abbreviation
    atCharacterPEl.textContent = '@'
    
		nextGameLiEl.innerHTML = ''
		nextGameLiEl.append(nextGameAwayTeamPEl)
		nextGameLiEl.append(atCharacterPEl)
		nextGameLiEl.append(nextGameHomeTeamPEl)
	}

	async renderChooseTeamScreen(): Promise<void> {
		chooseTeamScreen.style.display = 'flex'
		teamScreen.style.display = 'none'
		const api = new Api()

		const teams = await api.fetchAndReturnTeams()
		teams.forEach((team) => {
			const optionEl = document.createElement('option')
			optionEl.textContent = team.name
			optionEl.value = team.id.toString()
			teamSelectEl.append(optionEl)
		})
	}

	async renderTeamScreen(
		previousGame: GameItem,
		nextGame: GameItem
	): Promise<void> {
		this.changePreviousGameLiEl(previousGame)

		this.changeNextGameLiEl(nextGame)
		// nextGameLiEl.textContent = `${nextGame.teams.away.team.name} @ ${nextGame.teams.home.team.name}`
		chosenTeamH1El.textContent = UserInfo.favouriteTeam.name
		chooseTeamScreen.style.display = 'none'
		graphScreenEl.style.display = 'none'
		teamScreen.style.display = 'flex'
	}

	async renderGraphScreen(): Promise<void> {
		chooseTeamScreen.style.display = 'none'
		teamScreen.style.display = 'none'
		graphEl.style.display = 'block'
		graphScreenEl.style.display = 'block'
		if (myChart) myChart.destroy()

		// console.log('UserInfo.favouriteTeam', UserInfo.favouriteTeam)
		const api = new Api()
		let winsLosses = await api.fetchAndReturnTeamWinsAndLosses(
			UserInfo.favouriteTeam.id
		)

		let labels: string[]

		if (winsLosses.overtime) {
			labels = ['Wins', 'Losses', 'Overtime']
		} else {
			labels = ['Wins', 'Losses']
		}

		const data = [winsLosses.wins, winsLosses.losses, winsLosses.overtime]

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
		})
	}
}

class Init {
	async initChooseTeamScreen() {
		if (!UserInfo.favouriteTeam) {
			const render = new Render()
			render.renderChooseTeamScreen()
		} else {
			this.initTeamScreen(UserInfo.favouriteTeam.id)
		}
	}
	async initTeamScreen(id: number) {
		const api = new Api()
		const render = new Render()

		const team: TeamItem = await api.fetchAndReturnTeam(id)

		const previousGame: GameItem = await api.fetchAndReturnGame(
			team.previousGameSchedule.dates[0].games[0].gamePk
		)
		const nextGame: GameItem = await api.fetchAndReturnGame(
			team.nextGameSchedule.dates[0].games[0].gamePk
		)

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
graphBackButtonEl.addEventListener('click', () => {
	const init = new Init()
	init.initTeamScreen(UserInfo.favouriteTeam.id)
})
