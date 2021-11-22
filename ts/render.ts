/**
 * Handles all the rendering for the app
 */
class Render {
  /**
   * Creates an li-element with scores hidden if the game is not yet watched
   * or, if the game is watched, scores
   * @param gameItem The game that needs an element
   * @param screen Which screen that should be rendered when clicking back on video-modal
   * @returns An li-element with scores either hidden or displayed
   */
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
    const overtimeSoPEl = document.createElement('p')

    gameLiEl.classList.add('game-item')
    homeTeamScorePEl.classList.add('third-column')

    const awayTeam = await api.fetchAndReturnTeam(gameItem.teams.away.team.id)
    const homeTeam = await api.fetchAndReturnTeam(gameItem.teams.home.team.id)

    awayTeamPEl.textContent = awayTeam.abbreviation
    homeTeamPEl.textContent = homeTeam.abbreviation
    atCharacterPEl.textContent = '@'

    const userInfo = new UserInfo()

    const watchedGame = userInfo.checkIfGameIsWatched(gameItem.id)

    // If the game is not watched, hide scores else display scores
    if (!watchedGame) {
      awayTeamScorePEl.textContent = '*'
      homeTeamScorePEl.textContent = '*'
    } else {
      awayTeamScorePEl.textContent = gameItem.teams.away.goals.toString()
      homeTeamScorePEl.textContent = gameItem.teams.home.goals.toString()

      // Checking if game went to overtime or penalty shots
      if (gameItem.hasShootout) {
        overtimeSoPEl.textContent = 'SO'
      } else if (gameItem.periods.length === 4) {
        overtimeSoPEl.textContent = 'OT'
      }
    }

    gameLiEl.addEventListener('click', () => {
      this.changeVideoModalEl(gameItem.video, screen)
      userInfo.markGameAsWatched(gameItem.id)
    })

    gameLiEl.append(awayTeamPEl)
    gameLiEl.append(atCharacterPEl)
    gameLiEl.append(homeTeamPEl)
    gameLiEl.append(awayTeamScorePEl)
    gameLiEl.append(overtimeSoPEl)
    gameLiEl.append(homeTeamScorePEl)

    return gameLiEl
  }

  /**
   * Changes the content and displays the video-modal.
   * Displays a video and a backbutton
   * @param video string-link of the video for the game
   * @param backString Which screen to be rendered when clicking back
   */
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
    if (window.innerWidth > 1100) {
      videoEl.setAttribute('width', '1000')
    } else {
      videoEl.setAttribute('width', '250')
    }

    sourceEl.setAttribute('src', video)
    sourceEl.setAttribute('type', 'video/mp4')

    videoEl.append(sourceEl)

    videoModalEl.innerHTML = ''

    videoModalEl.append(backButtonEl)
    videoModalEl.append(videoEl)
    videoModalEl.style.display = 'grid'
  }

  /**
   * Creates an li-element with hometeam, awayteam and date for
   * when the game is set to be played
   * @param game Game which does not require score to be displayed
   * @returns LI-element with hometeam, awayteam and date for the game
   */
  async createGameItemWithoutScore(game: GameItem): Promise<HTMLLIElement> {
    const api = new Api()

    const newNextGameLiEl = document.createElement('li')

    newNextGameLiEl.classList.add('game-item')

    const nextGameAwayTeam = await api.fetchAndReturnTeam(
      game.teams.away.team.id
    )
    const nextGameHomeTeam = await api.fetchAndReturnTeam(
      game.teams.home.team.id
    )

    const nextGameAwayTeamPEl = document.createElement('p')
    const nextGameHomeTeamPEl = document.createElement('p')
    const atCharacterPEl = document.createElement('p')
    const datePEl = document.createElement('p')

    datePEl.classList.add('second-column')

    nextGameAwayTeamPEl.textContent = nextGameAwayTeam.abbreviation
    nextGameHomeTeamPEl.textContent = nextGameHomeTeam.abbreviation
    atCharacterPEl.textContent = '@'
    datePEl.textContent = game.date

    newNextGameLiEl.append(nextGameAwayTeamPEl)
    newNextGameLiEl.append(atCharacterPEl)
    newNextGameLiEl.append(nextGameHomeTeamPEl)
    newNextGameLiEl.append(datePEl)

    return newNextGameLiEl
  }

  /**
   * Displays first screen and hides the other screens.
   * Calls for all teams and add them to the select as an option
   */
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

  /**
   * Creates an item for each parameter and appends them to teamscreen.
   * Displays screen and hides other screens
   * @param previousGame The previous game from TeamItem
   * @param nextGame The next game from TeamItem
   */
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
    bodyEl.classList.remove('body-grid')
  }
  /**
   * Method which calls for a teams wins and losses then
   * renders a graph based on the result
   */
  async renderGraphScreen(): Promise<void> {
    chooseTeamScreen.style.display = 'none'
    graphScreenEl.style.display = 'block'

    if (window.innerWidth < 600) {
      teamScreen.style.display = 'none'
    } else {
      bodyEl.classList.add('body-grid')
    }


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
    newMyChartEl.setAttribute('height', '250')

    // Displays an error which I cannot get around
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

  /**
   * Method which calls for all games played last night and creates an element
   * for them then appends them to the game-list
   */
  async renderLastNightGames(): Promise<void> {
    lastNightScreenEl.style.display = 'flex'
    teamScreen.style.display = 'none'

    const date = new Date()
    const time = new Time()
    const api = new Api()

    const yesterdayDate = time.calculateAndReturnLastYesterdayDate(date)

    const fetchedGames: Array<any> = await api.fetchAndReturnGamesFromDate(
      yesterdayDate
    )
    lastNightHeadingEl.textContent = yesterdayDate

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
