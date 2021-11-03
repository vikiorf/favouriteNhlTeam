class Api {
  /**
   * Fetches all teams currently playing in the NHL
   * @returns All teams in the NHL
   */
  async fetchAndReturnTeams(): Promise<TeamItem[]> {
    const teams: TeamItem[] = await fetch(
      'https://statsapi.web.nhl.com/api/v1/teams'
    )
      .then(res => res.json())
      .then(res => {
        return res.teams
      })
    return teams
  }

  /**
   * Fetches a team from the id and returns chosen team
   * @param id Team Id
   * @returns Chosen team as TeamItem
   */
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

  /**
   * Fetches the chosen game and media for the chosen game
   * @param id Game Id
   * @returns Game along with media for the game
   */
  async fetchAndReturnGame(id: string): Promise<GameItem> {
    let game = await fetch(
      `https://statsapi.web.nhl.com/api/v1/game/${id}/linescore`
    )
      .then(res => res.json())
      .then(res => res)

    let hej = await fetch(
      `https://statsapi.web.nhl.com/api/v1/game/${id}/content`
    )
      .then(res => res.json())
      .then(res => res)

    game.video = hej.media.epg[3].items[0]?.playbacks[3].url
    game.id = id
    return game
  }

  /**
   * Fetches wins and losses and overtime for the chosen team
   * @param teamId Id of the team
   * @returns Wins and losses for the chosen team
   */
  async fetchAndReturnTeamWinsAndLosses(
    teamId: number
  ): Promise<{ wins: number; losses: number; overtime: number }> {
    const records = await fetch(
      `https://statsapi.web.nhl.com/api/v1/standings?expand=standings.record`
    )
      .then(res => res.json())
      .then(res => {
        return res.records
      })
    let winsLosses: {
      wins: number
      losses: number
      overtime: number
    } = {
      wins: 0,
      losses: 0,
      overtime: 0
    }
    records.forEach((record: StandingsRecordItem) => {
      record.teamRecords.forEach((teamRecord: StandingsTeamRecordItem) => {
        if (teamRecord.team.id === teamId) {
          winsLosses.wins = teamRecord.leagueRecord.wins
          winsLosses.losses = teamRecord.leagueRecord.losses
          winsLosses.overtime = teamRecord.leagueRecord.ot
        }
      })
    })
    return winsLosses
  }

  /**
   * Returns all games played at the certain date
   * @param date Date as a string
   * @returns Games from the chosen date
   */
  async fetchAndReturnGamesFromDate(date: string): Promise<[]> {
    return await fetch(
      `https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`
    )
      .then(res => res.json())
      .then(res => res.dates[0].games)
  }
}
