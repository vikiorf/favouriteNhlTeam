class Render {
  async createGameItemWithScore(
    gameItem: GameItem,
    screen: string
  ): Promise<HTMLLIElement> {
    const api = new Api()

    const gameLiEl = document.createElement('li')
    const awayTeamPEl = document.createElement('p')
    const homeTeamPEl = document.createElement('p')
    const atCharacterPEl = document.createElement('p')
    const awayTeamScorePEl = document.createElement('p')
    const homeTeamScorePEl = document.createElement('p')

    gameLiEl.classList.add('game-item')
    homeTeamScorePEl.classList.add('third-column')

    const awayTeam = await api.fetchAndReturnTeam(gameItem.teams.away.team.id)
    const homeTeam = await api.fetchAndReturnTeam(gameItem.teams.home.team.id)

    awayTeamPEl.textContent = awayTeam.abbreviation
    homeTeamPEl.textContent = homeTeam.abbreviation
    atCharacterPEl.textContent = '@'

    const userInfo = new UserInfo()

    const watchedGame = userInfo.checkIfGameIsWatched(gameItem.id)

    if (!watchedGame) {
      awayTeamScorePEl.textContent = '*'
      homeTeamScorePEl.textContent = '*'
    } else {
      awayTeamScorePEl.textContent = gameItem.teams.away.goals.toString()
      homeTeamScorePEl.textContent = gameItem.teams.home.goals.toString()
    }

    gameLiEl.addEventListener('click', () => {
      this.changeVideoModalEl(gameItem.video, screen)
      userInfo.markGameAsWatched(gameItem.id)
    })

    gameLiEl.append(awayTeamPEl)
    gameLiEl.append(atCharacterPEl)
    gameLiEl.append(homeTeamPEl)
    gameLiEl.append(awayTeamScorePEl)
    gameLiEl.append(homeTeamScorePEl)

    return gameLiEl
  }

  changeVideoModalEl(video: string, backString: string) {
    const videoEl = document.createElement('video')
    const sourceEl = document.createElement('source')
    const backButtonEl = document.createElement('button')

    // Removes the modal
    backButtonEl.addEventListener('click', () => {
      const init = new Init()
      videoModalEl.style.display = 'none'
      if (backString === 'teamscreen') {
        init.initTeamScreen(UserInfo.favouriteTeam.id)
      } else if ('last-night') {
        this.renderLastNightGames()
      }
      videoModalEl.innerHTML = ''
    })
    backButtonEl.textContent = 'Back'

    videoEl.setAttribute('controls', '')
    videoEl.setAttribute('width', '250')

    sourceEl.setAttribute('src', video)
    sourceEl.setAttribute('type', 'video/mp4')

    videoEl.append(sourceEl)

    videoModalEl.innerHTML = ''

    videoModalEl.append(backButtonEl)
    videoModalEl.append(videoEl)
    videoModalEl.style.display = 'grid'
  }

  async createGameItemWithoutScore(nextGame: GameItem): Promise<HTMLLIElement> {
    const api = new Api()

    const newNextGameLiEl = document.createElement('li')

    newNextGameLiEl.classList.add('game-item')

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

    newNextGameLiEl.append(nextGameAwayTeamPEl)
    newNextGameLiEl.append(atCharacterPEl)
    newNextGameLiEl.append(nextGameHomeTeamPEl)

    return newNextGameLiEl
  }

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

  async renderTeamScreen(
    previousGame: GameItem,
    nextGame: GameItem
  ): Promise<void> {
    const previousGameEl = await this.createGameItemWithScore(
      previousGame,
      'teamscreen'
    )
    const nextGameEl = await this.createGameItemWithoutScore(nextGame)
    gameListEl.innerHTML = ''
    gameListEl.append(previousGameEl)
    gameListEl.append(nextGameEl)

    chosenTeamH1El.textContent = UserInfo.favouriteTeam.name
    lastNightScreenEl.style.display = 'none'
    chooseTeamScreen.style.display = 'none'
    graphScreenEl.style.display = 'none'
    teamScreen.style.display = 'flex'
  }

  async renderGraphScreen(): Promise<void> {
    chooseTeamScreen.style.display = 'none'
    teamScreen.style.display = 'none'
    graphScreenEl.style.display = 'block'
    if (myChart) myChart.destroy()

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

    const newMyChartEl = document.createElement('canvas')
    console.log(window.innerWidth)
    if (window.innerWidth > 1100) {
      newMyChartEl.setAttribute('height', '150')
    } else if (window.innerWidth > 800) {
      console.log('hej')
      newMyChartEl.setAttribute('height', '200')
    } else {
      newMyChartEl.setAttribute('height', '500')
    }
    newMyChartEl.setAttribute('width', '400')


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
    })

    const backButtonEl = document.createElement('button')
    backButtonEl.setAttribute('id', 'graph-back')
    backButtonEl.textContent = 'Back'

    backButtonEl.addEventListener('click', () => {
      init.initTeamScreen(UserInfo.favouriteTeam.id)
    })

    graphScreenEl.innerHTML = ''
    graphScreenEl.append(backButtonEl)
    graphScreenEl.append(newMyChartEl)
  }

  async renderLastNightGames() {
    lastNightScreenEl.style.display = 'flex'
    teamScreen.style.display = 'none'

    const date = new Date()
    const time = new Time()
    const api = new Api()

    const yesterdayDate = await time.calculateAndReturnLastYesterdayDate(date)

    const fetchedGames: [] = await api.fetchAndReturnGamesFromDate(
      yesterdayDate
    )

    lastNightGameList.innerHTML = ''
    fetchedGames.forEach(async (game: any) => {
      const gameItem = await api.fetchAndReturnGame(game.gamePk)

      const gameLiEl = await this.createGameItemWithScore(
        gameItem,
        'last-night'
      )

      lastNightGameList.append(gameLiEl)
    })
  }
}
