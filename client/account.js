const usernameText = document.querySelector('.username-text');
const passwordText = document.querySelector('.password-text');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const goToSignupBtn = document.querySelector('.go-to-signup-btn');
const goToLoginBtn = document.querySelector('.go-to-login-btn');


const loginCheck = () => {
    
    let enteredUsername = usernameText.value
    let enteredPassword = passwordText.value 
    let login = false
    console.log(`initial login = ${login}`)

    axios.get('/api/users')
    .then((res) => {
        res.data.forEach(user => {
            if (enteredUsername === user.username && enteredPassword === user.password) {
                login = true
                console.log(`User name matches! login = ${login}`)
                window.location.replace('game-night.html')
            } 
        })
    })
    .catch((err) => {
        console.log(err)
    })
    
    
    const loginStatment = () => {
        if (login === false) {
            console.log(`log in failed loginStatment, it is ${login}`)
            alert('incorrect username or password')
        }
    }
    setTimeout(loginStatment, 3000)
}


const createUser = () => {
    let enteredUsername = usernameText.value
    let enteredPassword = passwordText.value

    if (enteredUsername === null || enteredPassword === null) {
        return alert('You must enter both a username and password')
    } else if (enteredUsername.length < 3 || enteredPassword.length < 3) {
        return alert('Both Username and Password must be at least 3 characters long')
    }
    
    axios.get('/api/users')
    .then((res) => {
        
        bodyObj = {
            username: enteredUsername,
            password: enteredPassword
        }
        
        res.data.forEach((user) => {
            if (user.username === enteredUsername) {
                return alert('Username already taken')
            } else { 
                addNewUser(bodyObj)
            }
        })
    })
}

const addNewUser = (bodyObj) => {
    axios.post('/api/users', bodyObj)
    .then((res)=> {
        
        window.location.replace('game-night.html')
    })
}

const goToSignup = () => {
    window.location.replace('signup.html')
}

const goToLogin = () => {
    window.location.replace('login.html')
}


if (loginBtn !== null) {
    loginBtn.addEventListener('click', loginCheck);
}

if (signupBtn !== null) {
    signupBtn.addEventListener('click', createUser);
}

if (goToSignupBtn !== null) {
    goToSignupBtn.addEventListener('click', goToSignup)
}

if (goToLoginBtn !== null) {
    goToLoginBtn.addEventListener('click', goToLogin)
}