const usernameText = document.querySelector('.username-text');
const passwordText = document.querySelector('.password-text');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');


const loginCheck = () => {
    
    let enteredUsername = usernameText.value
    let enteredPassword = passwordText.value 
    let login = false

    axios.get('/api/users')
    .then((res) => {
        res.data.forEach(user => {
            if (enteredUsername === user.username && enteredPassword === user.password) {
                login = true
                window.location.replace('game-night.html')
            }
            
        })
    })
    .catch((err) => {
        console.log(err)
    })
    
    if (login === false) {
        alert('incorrect username or password')
    }
}


const createUser = () => {
    let enteredUsername = usernameText.value
    let enteredPassword = passwordText.value
    
    axios.get('/api/users')
    .then((res) => {
        
        bodyObj = {
            username: enteredUsername,
            password: enteredPassword
        }
        
        console.log(bodyObj)

        axios.post('/api/users', bodyObj)
        .then((res)=> {
        })
    })
    window.location.replace('game-night.html')
}




if (loginBtn !== null) {
    loginBtn.addEventListener('click', loginCheck);
}

if (signupBtn !== null) {
    signupBtn.addEventListener('click', createUser);
}
