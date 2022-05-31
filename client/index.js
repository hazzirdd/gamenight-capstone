const boardgameList = document.querySelector('.boardgame-list')
const popupDiv = document.querySelector('#popup-bg');
const popupMainDiv = document.querySelector('#popup-main-div');
const gameSort = document.querySelector('#game-sort');
const sortSubmitBtn = document.querySelector('#sort-submit-btn');
const tableTop = document.querySelector('#tabletop-table-image');
const clearTableButton = document.querySelector('.clear-table-btn');
const gameRequestInput = document.querySelector('.game-request-input');
const gameRequesteeInput = document.querySelector('.game-requestee-input');
const gameRequestBtn = document.querySelector('.game-request-btn');
const gameRequestContainer = document.querySelector('.game-request-container');
const expansionList = document.querySelector('.expansions-container');
const searchBar = document.querySelector('#search-bar');
const searchSubmitBtn = document.querySelector('.search-submit-btn');
const addContainer = document.querySelector('.ad-container');
const hoverDeath = document.querySelector('.hover-death');

const baseURL = `/api/boardgames`

const getBoardgames = () => {
    axios.get(`/api/boardgames`)
    .then(res => {
        // console.log(res.data)
        addGameToTable(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

const displayGames = () => {
    boardgameList.innerHTML = ''
    
    axios.get(`/api/boardgames`)
    .then(res => {
        res.data.forEach(game => {
            let gameCard = `
            <div class="game-card" class="game-card-grid">
                <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}' alt="${game.title}">

                    <div class="game-info-box"></div>
            </div>
                    `
            //Took out this button, got annoying
            // <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                    
            boardgameList.innerHTML += gameCard
        })
    })
}

const displayExpansions = () => {
    expansionList.innerHTML = ``

    axios.get(`/api/expansions`)
    .then(res => {
        res.data.forEach(expansion => {
            let gameCard = `
            <div class="game-card" class="game-card-grid">
                <img onclick="openPopupMenuEx(${expansion.expansion_id})" class="expansion-image" src='${expansion.expansion_image}' alt="${expansion.expansion_title}">
                <div class="game-info-box"></div>
            </div>
            `

            expansionList.innerHTML += gameCard
        })
    })
}

// ORGANIZATION TOOLS
const sortBy = () => {
    boardgameList.innerHTML = ''


    console.log(gameSort.value)
    if (gameSort.value === 'title') {
        axios.get(`/api/sortbytitle`)
        .then(res => {
            res.data.forEach(game => {
                let gameCard = `
                <div class="game-card">
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}' alt="${game.title}">
                    <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                        <div class="game-info-box"></div>
                </div>
                        `
                        
                        boardgameList.innerHTML += gameCard
                    })
        })
    } else if (gameSort.value === 'genre') {
        axios.get(`/api/sortbygenre`)
        .then(res => {
            res.data.forEach(game => {
                let gameCard = `
                <div class="game-card">
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}' alt="${game.title}">
                    <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                        <div class="game-info-box"></div>
                </div>
                        `
                        
                        boardgameList.innerHTML += gameCard
                    })
        })
    } else if (gameSort.value === 'publisher') {
        axios.get(`/api/sortbypublisher`)
        .then(res => {
            res.data.forEach(game => {
                let gameCard = `
                <div class="game-card">
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}' alt="${game.title}">
                    <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                        <div class="game-info-box"></div>
                </div>
                        `
                        
                        boardgameList.innerHTML += gameCard
                    })
        })
    } else if (gameSort.value === 'year') {
        axios.get(`/api/sortbyyear`)
        .then(res => {
            res.data.forEach(game => {
                let gameCard = `
                <div class="game-card">
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}' alt="${game.title}">
                    <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                        <div class="game-info-box"></div>
                </div>
                        `
                        
                        boardgameList.innerHTML += gameCard
                    })
        })
    } else if (gameSort.value === 'haydens-rank') {
        axios.get(`/api/sortbyhayden`)
        .then(res => {
            res.data.forEach(game => {
                let gameCard = `
                <div class="game-card">
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}' alt="${game.title}">
                    <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                        <div class="game-info-box"></div>
                </div>
                        `
                        
                        boardgameList.innerHTML += gameCard
                    })
        })
    }
}

const search = () => {
    boardgameList.innerHTML = ''

    let searchValue = searchBar.value
    let searchValueUpper = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

    bodyObj = {
        searchReq: searchValueUpper
    }

    axios.post(`/api/search`, bodyObj)
    .then(res => {
        res.data.forEach(game => {
            let gameCard = `
            <div class="game-card">
                <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}' alt="${game.title}">
                <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                <div class="game-info-box"></div>
            </div>
                    `
            boardgameList.innerHTML += gameCard
        })
    })
}

// POP UP DEMO VIDEO JAVASCRIPT
const openPopupMenu = (id) => {

    popupMainDiv.innerHTML = ''
    
    axios.get(`/api/popup/${id}`)
    .then((res) => {
        res.data.forEach(game => {

            let expandedGame = `
            <p id="javascript-magic" onclick="closePopUpMenu()">${game.title}</p>
            <p id="javascript-desc">
                <img class="game-image-popup" src='${game.image}'>
                <div class="info-container">
                    <p>Players: ${game.players_min} to ${game.players_max}</p>
                    <p>Play Time: ${game.time}</p>
                    <p>Genre: ${game.genre}</p>
                </div>
                <div class="add-to-table-button-container">
                    <button onclick="addToTable(${game.boardgame_id})" class="add-to-table-button">Add To Table</button>
                </div>
            </p>
            <div id="close-popup-div" title="Close Menu" onclick="closePopupMenu()">
                <p>X</p>
            </div>

            <div class="expansions-in-popup-container">
            </div>
            `
            popupDiv.style.display = "block"
            popupMainDiv.innerHTML += expandedGame

            axios.get(`/api/expansions/${game.boardgame_id}`)
            .then(res => {
                res.data.forEach(expansion => {
                    const expansionPopupContainer = document.querySelector('.expansions-in-popup-container')

                    let expansionUnder = `
                    <img class="expansions-in-popup" src="${expansion.expansion_image}">
                    `
                    expansionPopupContainer.innerHTML += expansionUnder

                })
            })
            

        }) 
    })
}
    
const openPopupMenuEx = (id) => {

    popupMainDiv.innerHTML = ''
    
    axios.get(`/api/popupEx/${id}`)
    .then((res) => {
        res.data.forEach(game => {

            let expandedGame = `
            <p id="javascript-magic" onclick="closePopUpMenu()">${game.expansion_title}</p>
            <div id="javascript-desc">
                <img class="game-image-popup" src='${game.expansion_image}'>
                <div class="info-container-ex">
                    <p>Adds ${game.players_added} more players</p>
                </div>
                <div class="add-to-table-button-container-ex">
                    <button onclick="addExToTable(${game.expansion_id})" class="add-to-table-button">Add To Table</button>
                </div>
            </div>
            <div id="close-popup-div" title="Close Menu" onclick="closePopupMenu()">
            <p>X</p>
            </div>`
            
            popupDiv.style.display = "block"
            popupMainDiv.innerHTML += expandedGame

        }) 
    })
}

let tableFull = false

const addToTable = (id) => {
    
    if (tableFull === true) {
        alert('You can only add 6 games to the table')
        return
    } else {

    axios.get(`/api/counter`)
    .then((res) => {
        let count = res.data[0].count
        if (count >= 6) {
            console.log('tableFull = true')
            return tableFull = true
        } else {

        
        console.log(tableFull)
        
        axios.get(`/api/popup/${id}`)
    .then((res) => {
        res.data.forEach(game => {
            console.log(game)
            let bodyObj = {
                id: game.boardgame_id,
                title: game.title,
                image: game.image
            }
            
            
                axios.post(`/api/table`, bodyObj)
                .then((res) => {
                    
                    
                    closePopupMenu()
                    document.location.reload(true);
                })
            })
        })
      }
    })
  }
}

const addPackToTable = (id1, id2) => {

    bodyObj = {
        boardgame_id: id1,
        expansion_id: id2
    }

    axios.post(`/api/getexpansion`, bodyObj)
    .then(res => {

        console.log(res.data)
        
        axios.post(`/api/getboardgame`, bodyObj)
        .then(res => {
            console.log(res.data)
            res.data.forEach(game => {
                
                
                finalBodyObj = {
                    boardgame_id: game.boardgame_id,
                    expansion_id: game.expansion_id,
                    boardgame_image: `${game.boardgame_image}`,
                    expansion_image: `${game.expansion_image}`
                }
                
            })
            console.log(finalBodyObj)
            
            // axios.post(`/api/getallgames`, finalBodyObj)
            // .then(res => {
                
            // })
        })
    })
    
}

const displayTableGames = () => {
    tableTop.innerHTML = ''

    axios.get(`/api/tabletop`)
    .then((res) => {
        res.data.forEach(game => {
            let tableGame = `
            <div class="table-image-x-container">
                <img class="table-image" src="${game.tabletop_boardgame_image}" alt="image">
                <p class="table-game-x" onclick="removeTableGame('${game.tabletop_boardgame_image}')">X</p>
            </div>
            `

            tableTop.innerHTML += tableGame
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

const addExToTable = (id) => {
    
    if (tableFull === true) {
        alert('You can only add 6 games to the table')
        return
    } else {

    axios.get(`/api/counter`)
    .then((res) => {
        let count = res.data[0].count
        if (count >= 6) {
            console.log('tableFull = true')
            return tableFull = true
        } else {

        
        console.log(tableFull)
        
        axios.get(`/api/popupEx/${id}`)
    .then((res) => {
        res.data.forEach(ex => {
            let bodyObj = {
                id: ex.expansion_id,
                title: ex.expansion_title,
                image: ex.expansion_image
            }
            
            
                axios.post(`/api/table`, bodyObj)
                .then((res) => {
                    
                    
                    closePopupMenu()
                    document.location.reload(true);
                })
            })
        })
      }
    })
  }
}

const removeTableGame = (id) => {

    bodyObj = {
        image: id
    }

    console.log(bodyObj)
    axios.put(`/api/removetabletop`, bodyObj)
    .then((res) => {
        document.location.reload(true);
    })
}

const closePopupMenu = () => {
    popupDiv.style.display = "none"
}


// Video demo on accordion
document.querySelectorAll('.accordion_button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('accordion_button--active');

            })
        });
        
        const checker = () => {
            // alert('check')
            console.log('check')
        }
        
        
        
const clearTable = (id) => {
    axios.delete(`/api/tabletop/${id}`)
    .then((res) => {
        tableFull = false
        document.location.reload(true);
    })
}

const goToHome = (that) => {
    window.location.replace('game-night.html')
}

const requestGame = () => {
    bodyObj = {
    requestTitle: gameRequestInput.value,
    requestee: gameRequesteeInput.value
    }

    axios.post(`/api/request`, bodyObj)
    .then((res) => {
        console.log(res)
        document.location.reload(true);
    })
    .catch((err) => {
        console.log(err)
    })
}

//NOT IN USE
// const getRequests = () => {
//     axios.get(`http://localhost:8080/api/request`)
//     .then((res) => {
//         displayRequests(res.data)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }

const displayRequests = () => {
    axios.get(`/api/request`)
    .then((res) => {
        res.data.forEach((request) => {
            // gameRequestContainer.innerHTML = ''

            requestCard = `
            <p>
            <span class="requestee-text">${request.requestee}</span>
            requested 
            <span class="request-title-text">${request.title}</span>
            </p><br>
            `

            gameRequestContainer.innerHTML += requestCard
        })
    })
    .catch((err) => {
        console.log(err)
    })
}


const popUpAd = () => {

    addContainer.innerHTML += `
    <img onclick="goToAd()" src="https://static.vecteezy.com/system/resources/previews/001/195/589/original/speech-bubble-png.png" class="ad">
    <div class="ad-text-container">
        <h3 onclick="goToAd()" class="bubble-text">psssst... click me.. you can trust me bro</h3>
    </div>
    `
}

const goToAd = () => {
    window.open("https://deployment-lab-haz.herokuapp.com/")
}


const randomChance = () => {
    let fate = Math.floor(Math.random() * 20);
    console.log(fate)

    if(fate === 19) {
        popUpAd()
    } else {
        return 
    }
}



randomChance();
displayGames();
displayTableGames();
displayExpansions();
displayRequests();

sortSubmitBtn.addEventListener('click', sortBy);
clearTableButton.addEventListener('click', clearTable);
gameRequestBtn.addEventListener('click', requestGame);
searchSubmitBtn.addEventListener('click', search);

if (hoverDeath !== null) {
    hoverDeath.addEventListener('click', mazeLose)
}