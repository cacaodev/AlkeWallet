// LOGIN
let loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let usuarioValido = "camila@alkewallet.com";
        let contrasenaValida = "contraseña123";
        let emailIngresado = document.getElementById("exampleInputEmail1").value;
        let contrasenaIngresada = document.getElementById("exampleInputPassword1").value;

        if (emailIngresado.toLowerCase() === usuarioValido.toLowerCase() && contrasenaIngresada === contrasenaValida) {
            alert("¡Bienvenido! serás redirigido al menú principal en un instante");
            window.location.href = "../menu.html";
            console.log("Datos correctos");

        } else {
            alert("Intente nuevamente");
            console.error("Usuario o contraseña incorrectos");
        }
    });
}

//MENU
let botonDepositar = document.getElementById("deposit");
let botonEnviar = document.getElementById("sendMoney");
let botonMovimientos = document.getElementById("transactions");

if (botonDepositar) {
    botonDepositar.addEventListener("click", function () {
        alert("Redirigiendo a Depositar...");
        window.location.href = "feature/deposit.html";
    });
}

if (botonEnviar) {
    botonEnviar.addEventListener("click", function () {
        alert("Redirigiendo a Enviar Dinero...");
        window.location.href = "sendmoney.html";
    });
}

if (botonMovimientos) {
    botonMovimientos.addEventListener("click", function () {
        alert("Redirigiendo a Últimos Movimientos...");
        window.location.href = "feature/transactions.html";
    });
}

//DEPOSIT
let saldoGuardado = localStorage.getItem("saldoUsuario");
let saldoInicial = 100000;

if (saldoGuardado != null) {
    saldoInicial = parseInt(saldoGuardado);
}

let elementoSaldo = document.getElementById("saldoActual");

if (elementoSaldo) {
    elementoSaldo.innerText = "Saldo actual: $" + saldoInicial.toLocaleString('es-ES');
}

let formDepositar = document.getElementById("formDepositar");
let campoMonto = document.getElementById("montoDeposito");

if (formDepositar) {
    formDepositar.addEventListener("submit", function (event) {
        event.preventDefault();

        let montoAgregado = parseInt(campoMonto.value);

        if (montoAgregado > 0) {
            saldoInicial = saldoInicial + montoAgregado;
            localStorage.setItem("saldoUsuario", saldoInicial);
            alert("¡Depósito exitoso! Nuevo saldo: $" + saldoInicial.toLocaleString('es-ES'));
            window.location.href = "../menu.html";

        } else {
            alert("Solo puedes ingresar números naturales positivos. Intenta nuevamente.");
            console.error("No puedes depositar un número negativo.");
        }
    });
}

//SENDMONEY
//TRANSACTIONS
//GLOBAL
let botonVolver = document.getElementById("menu");
if (botonVolver) {
    botonVolver.addEventListener("click", function () {
        alert("Regresando al menú principal...");
        window.location.href = "../menu.html";
    });
}