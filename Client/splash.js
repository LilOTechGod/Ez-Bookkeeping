const signUpBtn = document.getElementById('signUpBtn');
const baseurl = 'http://localhost:4444'

const login = (body) => axios.post(`${baseurl}/login`, body)
    .then((res) => {
        console.log(res.data);
        
        window.alert("Welcome, You've been successfully logged in!");
        window.location.href = './landingPage.html';
    })
    .catch(err => console.error(err)); 

const signUp = (body) => axios.post(`${baseurl}/register`, body)
    .then(async(res) => {
        console.log(res.data);

        window.prompt('Log in to get started!')
        window.location.href = '/';
    })
    .catch(err => console.error(err)); 


    const handleAuth = (authType, body) => {
        authType === "SignUp" ? signUp(body) : login(body);
      };


    signUpBtn.addEventListener('submit', signUp);


    const email = document.getElementById('email')
    const password = document.getElementById('password');
    const authLogIn = document.getElementById('logInBtn');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const userName = document.getElementById('userName');

    authLogIn.addEventListener('click', (e) => {
        e.preventDefault();

        console.log(authLogIn.textContent)
        if(authLogIn.textContent.trim() === 'LogIn') {
            const loginBody = {
                email: email.value,
                password: password.value
            };
            handleAuth('Login', loginBody)
        } else {
            const signUpBody = {
                firstName: firstName.value,
                lastName: lastName.value,
                userName: userName.value,
                email: email.value,
                password: password.value
            };
            handleAuth('SignUp', signUpBody);
        }
        email.value = ''
        password.value = ''
        firstName.value = ''
        lastName.value = ''
        userName.value = ''
    });