class UserInfo {
  static favouriteTeam: TeamItem = JSON.parse(
    localStorage.getItem('favourite-team')!
  )
    ? JSON.parse(localStorage.getItem('favourite-team')!)
    : null

  static watchedGames = JSON.parse(localStorage.getItem('watched-games')!)
    ? JSON.parse(localStorage.getItem('watched-games')!)
    : []

  async setFavouriteTeam(key: number): Promise<void> {
    const api = new Api()
    const team = await api.fetchAndReturnTeam(key)
    UserInfo.favouriteTeam = team
    localStorage.setItem('favourite-team', JSON.stringify(team))
  }

  markGameAsWatched(id: string): void {
    const games = [...UserInfo.watchedGames]
    const foundGameId = games.findIndex(gameId => gameId === id)
    if (foundGameId === -1) {
      games.push(id)
      UserInfo.watchedGames = games
      localStorage.setItem('watched-games', JSON.stringify(games))
    }
  }

  checkIfGameIsWatched(gameId: string): boolean {
    let watched = UserInfo.watchedGames.findIndex(
      (_gameId: string) => _gameId === gameId
    )
    if (watched === -1) {
      return false
    } else {
      return true
    }
  }
}
