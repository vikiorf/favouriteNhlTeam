class Api {
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

  async fetchAndReturnGamesFromDate(date: string): Promise<[]> {
    return await fetch(
      `https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`
    )
      .then(res => res.json())
      .then(res => res.dates[0].games)
  }
}
