const boardgameList = document.querySelector('.boardgame-list')
const popupDiv = document.querySelector('#popup-bg');
const popupMainDiv = document.querySelector('#popup-main-div');
const gameSort = document.querySelector('#game-sort');
const sortSubmitBtn = document.querySelector('#sort-submit-btn');
const tableTop = document.querySelector('#tabletop-table-image');
const clearTableButton = document.querySelector('.clear-table-btn');

const baseURL = `https://gamenight-with-haz.herokuapp.com/api/boardgames`

const getBoardgames = () => {
    axios.get(`https://gamenight-with-haz.herokuapp.com/api/boardgames`)
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
    
    axios.get(`https://gamenight-with-haz.herokuapp.com/api/boardgames`)
    .then(res => {
        res.data.forEach(game => {
            let gameCard = `
            <div class="game-card" class="game-card-grid">
                <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}'>

                    <div class="game-info-box"></div>
            </div>
                    `
                    //Took out this button, got annoying
                    // <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                    
                    boardgameList.innerHTML += gameCard
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
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}'>
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
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}'>
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
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}'>
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
                    <img onclick="openPopupMenu(${game.boardgame_id})" class="game-image" src='${game.image}'>
                    <button onclick="openPopupMenu(${game.boardgame_id})" class="game-image-button">${game.title}</button>
                        <div class="game-info-box"></div>
                </div>
                        `
                        
                        boardgameList.innerHTML += gameCard
                    })
        })
    }
}

// POP UP DEMO VIDEO JAVASCRIPT
const openPopupMenu = (id) => {

    popupMainDiv.innerHTML = ''
    
    axios.get(`/api/popup/${id}`)
    .then((res) => {
        res.data.forEach(game => {

            // let body = {
            //     id: game.boardgame_id,
            //     image: `${game.image}`
            // }

            // console.log(body)

            let expandedGame = 
            `<p id="javascript-magic">
            ${game.title}
            </p>
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
            <p>
            X
            </p>
            </div>`
            
            popupDiv.style.display = "block"
            popupMainDiv.innerHTML += expandedGame

        }) 
    })
}
    

//LEFT OFF HERE 5/23

//I want to use this function below to enter the boardgame_id onto the tabletop, that works. 
// Next I want to call a new function within addGameToTable, addGameImagetoTable perhaps.
// addGameImagetoTable will also edit the html of tableTop to show the new images.

//above was mostly done, now we got to figure out addGameImagetoTable

// const addGameIdToTable = (id) => {
//     console.log(id)
//     axios.post(`http://localhost:8080/api/tabletop/${id}`)
//     .then((res) => {
//         res.data.forEach(game => {
//             console.log('ID made it out of the backend!')

//             // let = tableGame = `
//             // <h1>${game.image}</h1>
//             // `
//             // <img class="table-image" src="${game.image}">
//             // tableTop.innerHTML += tableGame
//         })
//     })
//     .catch((err) => {
//         console.error(err)
//     })
// }

let tableFull = false

const addToTable = (id) => {

    axios.get(`/api/counter`)
    .then((res) => {
        let count = res.data[0].count
        if (count >= 6) {
            alert('You can only add 6 games to the table')
            return tableFull = true
        } else {
            // alert(`Table now as ${count} games`)
        }
    })
    
    console.log(tableFull)
    
    axios.get(`/api/popup/${id}`)
    .then((res) => {
        res.data.forEach(game => {
            let bodyObj = {
                id: game.boardgame_id,
                title: game.title,
                image: game.image
            }

            if (tableFull === true) {
                return tableFull === true
            } else {

                axios.post(`/api/table`, bodyObj)
                .then((res) => {


                    closePopupMenu()
                    document.location.reload(true);
                })
            }
        })
    })
}

const displayTableGames = () => {
    tableTop.innerHTML = ''

    axios.get(`/api/tabletop`)
    .then((res) => {
        res.data.forEach(game => {
            let tableGame = `
            <img class="table-image" src="${game.tabletop_image}" alt="image">
            `

            tableTop.innerHTML += tableGame
        })
    })
    .catch((err) => {
        console.log(err)
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

displayGames();
displayTableGames();

sortSubmitBtn.addEventListener('click', sortBy);
clearTableButton.addEventListener('click', clearTable)


//NOTES FOR RETURN ON TUESDAY

// 3. Add shadow effect to the table and tableGames to make them look 3D