function login(e) {
    e.preventDefault();

    console.log('Working');

    let errormsg = document.getElementById('error');
    let username = document.getElementById('login-username');
    let password = document.getElementById('login-password');

    username.addEventListener('focus', e => {
        errormsg.style.opacity = '0';
    });
    password.addEventListener('focus', e => {
        errormsg.style.opacity = '0';
    });

    const credentials = { username: username.value, password: password.value };

    // try {
    //     let res = await fetch('http://localhost:3000/auth/login', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify(credentials)
    //     });

    //     if (res.status === 401) {
    //         errormsg.style.opacity = '100';
    //     } else if (res.status === 200) {
    //         console.log(res.json());
    //         window.location = 'home.html';
    //     }
    // } 
    // catch {
    //     console.log(err);
    // }

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
            console.log(res.json());
            window.location = 'home.html';
        }
    }).catch(err => {
        console.log(err);
    });
}