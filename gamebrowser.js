function Game(roster) {
    this.roster = roster
    this.currentBatter = 0
    this.ourScore = 0
    this.theirSore = 0
    
    this.getNextBatter = function () {
        this.currentBatter++
        let batter = this.roster[this.currentBatter]
        if(this.currentBatter >= this.roster.length){
            this.currentBatter = 0
        }
        return batter
    }

    this.updateRoster = function (roster){
        this.roster = roster
    }

    this.resume = function (gameInProgress) {
        this.roster = gameInProgress.roster
        this.currentBatter = gameInProgress.currentBatter
        this.ourScore = gameInProgress.ourScore
        this.theirSore = gameInProgress.theirSore
    }

    this.getCurrentBatter = function () {
        return roster[this.currentBatter]
    }

    this.getOnDeckBatter= function () {
        let onDeckIndex = this.currentBatter
        if (this.currentBatter >= this.roster.length - 1) {
            onDeckIndex = 0
        } else {
            onDeckIndex ++
        }
        return roster[onDeckIndex]
    }
}

let currentGame

let initializeGame = function () {
    const rosterJSON = localStorage.getItem('roster')
    if (rosterJSON != null){
        roster = JSON.parse(rosterJSON)
    } else {
        roster = []
    }

    currentGame = new Game(roster)

    const gameJSON = localStorage.getItem('game')
    if(gameJSON !== null){
        currentGame.resume(JSON.parse(gameJSON))
        currentGame.updateRoster(roster)
    }

    updateBatterView()
}


let updateBatterView = function () {
    document.querySelector('#next-batter-p').textContent = currentGame.getCurrentBatter()
    document.querySelector('#on-deck-batter-p').textContent = currentGame.getOnDeckBatter()
    document.querySelector('#our-score').textContent = currentGame.ourScore
    document.querySelector('#their-score').textContent = currentGame.theirSore
    rosterCheck()
    
}

let rosterCheck = function (params) {
    if (currentGame.roster.length === 0) {
        document.querySelector("#roster-warning-jumbo").classList.remove('hidden')
    }
}

document.querySelector('#next-batter-btn').addEventListener('click',function () {
    currentGame.getNextBatter()
    updateBatterView()
    localStorage.setItem('game', JSON.stringify(currentGame))
})

document.querySelector('#reset-game').addEventListener('click', function () {
    localStorage.clear()
    initializeGame()
})

document.querySelector("#our-score-plus").addEventListener('click', function () {
    currentGame.ourScore++
    updateBatterView()
    localStorage.setItem('game', JSON.stringify(currentGame))
})

document.querySelector("#our-score-minus").addEventListener('click', function () {
    currentGame.ourScore--
    if (currentGame.ourScore < 0) {
        currentGame.ourScore = 0
    }
    updateBatterView()
    localStorage.setItem('game', JSON.stringify(currentGame))
})

document.querySelector("#their-score-plus").addEventListener('click', function () {
    currentGame.theirSore++
    updateBatterView()
    localStorage.setItem('game', JSON.stringify(currentGame))
})

document.querySelector("#their-score-minus").addEventListener('click', function () {
    currentGame.theirSore--
    if(currentGame.theirSore < 0){
        currentGame.theirSore = 0
    }
    updateBatterView()
    localStorage.setItem('game', JSON.stringify(currentGame))
})

initializeGame()

