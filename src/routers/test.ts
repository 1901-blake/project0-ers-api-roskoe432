function Main(cb) {
    console.log('Hello, ');
    cb();
}

function A() {
    console.log('World');
}
function B() {
    console.log('Ben');
}
function C() {
    console.log('Bob');
}

Main(A);
Main(B);
Main(C);