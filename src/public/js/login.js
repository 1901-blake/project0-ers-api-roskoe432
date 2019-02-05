function login(e) {
    e.preventDefault();

    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    const credentials = { username, password };

    fetch('http://localhost:<3000>/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
    }).then(res => {
        window.location = 'http://localhost:<port#>/public/home.html';
    }).catch(err => {
        console.log(err);
    });
}