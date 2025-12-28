// LOGIN JAVASCRIPT
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

// MENU JAVASCRIPT
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

// DEPOSIT JAVASCRIPT
let saldoInicial = 100000; 
let saldoActual = saldoInicial;

let saldoGuardado = localStorage.getItem("saldoUsuario");
if (saldoGuardado != null) {
    saldoActual = parseInt(saldoGuardado);
}

let elementoSaldo = document.getElementById("saldoActual");
if (elementoSaldo) {
    elementoSaldo.innerText = "Saldo actual: $" + saldoActual.toLocaleString('es-ES');
}

let formDepositar = document.getElementById("formDepositar");

let campoMonto = document.getElementById("montoDeposito");

if (formDepositar) {
    formDepositar.addEventListener("submit", function (event) {
        event.preventDefault();

        let montoAgregado = parseInt(campoMonto.value);

        if (montoAgregado > 0) {
            saldoActual = saldoActual + montoAgregado;
            localStorage.setItem("saldoUsuario", saldoActual); 
            alert("¡Depósito exitoso! Nuevo saldo: $" + saldoActual.toLocaleString('es-ES'));
            console.log("¡Depósito exitoso! Nuevo saldo: $" + saldoActual.toLocaleString('es-ES'));
            campoMonto.value = "";
        } else {
            alert("Solo puedes ingresar números naturales positivos. Intenta nuevamente.");
            console.error("No puedes depositar un número negativo.");
        }
    });
}

// SENDMONEY JAVASCRIPT
let botonAgregarContacto = document.getElementById("agregarContacto");
if (botonAgregarContacto) {
    botonAgregarContacto.addEventListener("click", function(event) {
        let nombre = prompt("Ingrese nombre y apellido:");
        let cbu = prompt("Ingrese su número de CBU:");
        let alias = prompt("Ingrese un alias:");
        let banco = prompt("Ingrese nombre del Banco:");
        if (nombre) {
            alert("Agregaste a " + nombre + " a la agenda de contactos");
        }
    });
}

let botonEnviarDinero = document.getElementById("enviarDinero");
if (botonEnviarDinero) {
    botonEnviarDinero.addEventListener("click", function(event) {
        event.preventDefault();
        let destinatario = prompt("Ingrese nombre destinatario:");
        let montoTexto = prompt("Ingrese monto a transferir:");
        let monto = parseInt(montoTexto);
        if (monto > 0 && monto <= saldoActual) {
            saldoActual = saldoActual - monto;
            localStorage.setItem("saldoUsuario", saldoActual);
            alert("Enviaste $" + monto.toLocaleString('es-ES') + " a " + destinatario + ". Te quedan $" + saldoActual.toLocaleString('es-ES') + ".");
        } else if (monto > saldoActual) {
            alert("Fondos insuficientes para realizar esta operación.");
            console.error("Falta dinero en la cuenta.");
        } else {
            alert("El monto ingresado no es válido.");
            console.error("Error de monto.");
        }
    });
}

// GLOBAL JAVASCRIPT
let botonVolver = document.getElementById("menu");
if (botonVolver) {
    botonVolver.addEventListener("click", function () {
        alert("Regresando al menú principal...");
        window.location.href = "../menu.html";
    });
}