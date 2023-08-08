// Grabbed all of the elements needed for add event listeners
const signUpBtn = document.getElementById('signUpBtn');
const passwordSignUp = document.getElementById('passwordSignUp');
const emailSignUp = document.getElementById('emailSignUp');
const email = document.getElementById('email')
const password = document.getElementById('password');
const authLogIn = document.getElementById('logInBtn');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userName = document.getElementById('userName');
const subBtn = document.getElementById('subBtn')

// baseUrl so that i wouldn't type out the whole url every time
const baseurl = 'http://localhost:4444'


// axios request to /login endpoint so that cb function in auth could login in a user/manager
const login = (body) => axios.post(`${baseurl}/login`, body)
.then((res) => {
    console.log(res.data);
    
    window.alert("Welcome, You've been successfully logged in!");
    window.location.href = './landingPage.html';
})
.catch(err => console.error(err)); 



// axios request to /register endpoint so that cb function in auth could register a new user/manager
const signUp = (body) => axios.post(`${baseurl}/register`, body)
    .then((res) => {
        console.log(res.data);

        window.alert('Log in to get started!')
    })
    .catch(err => console.error(err)); 


// addeventlistener to the sign up button on the front end, once clicked and if all fields are filled then send input data to backend then run signup function with new user data as sign up body
    signUpBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // console.log('im working');
        if(emailSignUp && passwordSignUp && firstName && lastName && userName) {
            const signUpBody = {
                firstName: firstName.value,
                lastName: lastName.value,
                userName: userName.value,
                email: emailSignUp.value,
                password: passwordSignUp.value
            };
            signUp(signUpBody);
        }
        firstName.value = ''
        lastName.value = ''
        userName.value = ''
        emailSignUp.value = ''
        passwordSignUp.value = ''
    });

// addeventlistener to the log in button on the front end, once button is clicked and if all fields have been filled. Run login function and send new user data to the backend to verify if user is successfully logged in.
    authLogIn.addEventListener('click', (e) => {
        e.preventDefault();

        console.log(authLogIn.textContent)
        if(email && password) {
            const loginBody = {
                email: email.value,
                password: password.value
            };
            login(loginBody)
        }
        email.value = ''
        password.value = ''
    });


    const getNotification = () => {
        window.alert("You've been subscribed to our newsletter!")
    }


subBtn.addEventListener('click', getNotification);
