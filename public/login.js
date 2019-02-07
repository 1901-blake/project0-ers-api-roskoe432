function login(e) {
    e.preventDefault();

    let errormsg = document.getElementById('error');
    let username = document.getElementById('login-username');
    let password = document.getElementById('login-password');

    let setToZero = e => { errormsg.style.opacity = '0' };
    username.addEventListener('focus', setToZero);
    password.addEventListener('focus', setToZero);

    const credentials = { username: username.value, password: password.value };

    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
    }).then(res => {
        console.log(res.status);
        if (res.status === 401) {
            errormsg.style.opacity = '100';
        } else if (res.status === 200) {
            window.location = 'home.html';
        }
    }).catch(err => {
        console.log(err);
    });
}