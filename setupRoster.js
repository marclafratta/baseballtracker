document.querySelector('#set-roster-btn').addEventListener('click', function (e) {
    buildRoster()
})

document.querySelector('body').addEventListener('keyup', function (e) {
    if(e.keyCode == 13){
        e.preventDefault()  
        buildRoster()
    }
})

const buildRoster = function () {
    const rosterlist = document.querySelectorAll('#roster-list > div > input')
    let roster = []
    rosterlist.forEach(function (child, index) {
        if (child.value !== "") {
            console.log(child)
            console.log(child.value)
            roster.push(child.value)
        }
    })

    localStorage.setItem('roster', JSON.stringify(roster))
}

const rosterJSON = localStorage.getItem('roster')
let roster = []
if(rosterJSON !== null){
    roster = JSON.parse(rosterJSON)
}

roster.forEach(function (player, index) {
    console.log(document.querySelector(`#player${index+1}`))
    document.querySelector(`#player${index+1}`).value = player
})

