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
const chosenTeamH1El = document.querySelector('#chosen-team')! as HTMLHeadingElement

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
      }
    }
  }
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
      .then(res => res.json())
      .then(res => {
        return res.teams
      })
    console.log('teams', teams)
    return teams
  }

  async fetchAndReturnTeam(id: number): Promise<TeamItem> {
    const team: TeamItem = await fetch(
      `https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.schedule.next&expand=team.schedule.previous`
    )
      .then(res => res.json())
      .then(res => {
        return res.teams[0]
      })
    return team
  }

  async fetchAndReturnGame(link: string): Promise<GameItem> {
    let game = await fetch(
      `https://statsapi.web.nhl.com/api/v1/game/${link}/linescore`
    )
      .then(res => res.json())
      .then(res => res)
    return game
  }
}

class Render {
  async renderChooseTeamScreen(): Promise<void> {
    chooseTeamScreen.style.display = 'flex'
    teamScreen.style.display = 'none'
    const api = new Api()

    const teams = await api.fetchAndReturnTeams()
    teams.forEach(team => {
      const optionEl = document.createElement('option')
      optionEl.textContent = team.name
      optionEl.value = team.id.toString()
      teamSelectEl.append(optionEl)
    })
  }

	async renderTeamScreen(previousGame: GameItem, nextGame: GameItem): Promise<void> {
		previousGameLiEl.textContent = `${previousGame.teams.away.team.name}: ${previousGame.teams.away.goals} @ ${previousGame.teams.home.team.name}: ${previousGame.teams.home.goals}`

    nextGameLiEl.textContent = `${nextGame.teams.away.team.name} @ ${nextGame.teams.home.team.name}`
    chosenTeamH1El.textContent = UserInfo.favouriteTeam.name
    chooseTeamScreen.style.display = 'none'
    teamScreen.style.display = 'flex'
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

selectTeamForm.addEventListener('submit', e => {
  e.preventDefault()
  init.initTeamScreen(parseInt(teamSelectEl.value))
  const userInfo = new UserInfo()
  userInfo.setFavouriteTeam(parseInt(teamSelectEl.value))
})
settingsButtonEl.addEventListener('click', () => {
  const render = new Render()
  render.renderChooseTeamScreen()
})
