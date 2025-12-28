// LOGIN
$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();
        var emailIngresado = $('#exampleInputEmail1').val();
        var contrasenaIngresada = $('#exampleInputPassword1').val();
        var usuarioValido = 'camila@alkewallet.com';
        var contrasenaValida = 'contraseña123';

        if (emailIngresado.toLowerCase() === usuarioValido.toLowerCase() && contrasenaIngresada === contrasenaValida) {
            $('#iniciarSesion').fadeIn();
            $('#usuarioInvalido').hide();
            setTimeout(function () {
                window.location.href = "../menu.html";
            }, 3000);

        } else {
            $('#iniciarSesion').hide();
            $('#usuarioInvalido').fadeIn();
        }
    });
});

// MENU
$(document).ready(function () {
    $("#deposit").click(function () {
        alert("Redirigiendo a Depositar");
        window.location.href = "feature/deposit.html";
    });
    
    $("#sendMoney").click(function () {
        alert("Redirigiendo a Enviar Dinero");
        window.location.href = "sendmoney.html";
    });

    $("#transactions").click(function () {
        alert("Redirigiendo a Últimos Movimientos");
        window.location.href = "feature/transactions.html";
    });

    var saldoInicial = 100000;
    var saldoActual = saldoInicial;

    var saldoGuardado = localStorage.getItem("saldoUsuario");
    if (saldoGuardado != null) {
        saldoActual = parseInt(saldoGuardado);
    }

    if ($('#saldoActual').length) {
        $('#saldoActual').text("Saldo actual: $" + saldoActual.toLocaleString('es-ES'));
    }
});

// DEPOSIT
$(document).ready(function () {
    var saldoInicial = 100000;
    var saldoActual = saldoInicial;
    var saldoGuardado = localStorage.getItem("saldoUsuario");

    if (saldoGuardado != null) {
        saldoActual = parseInt(saldoGuardado);
    }

    if ($('#saldoDisplay').length) {
        $('#saldoDisplay').text("Tu saldo actual es: $" + saldoActual.toLocaleString('es-ES'));
    }

    $('#formDepositar').submit(function (event) {
        event.preventDefault();
        var monto = parseInt($('#montoDeposito').val());

        if (!isNaN(monto) && monto > 0) {
            saldoActual += monto;
            localStorage.setItem("saldoUsuario", saldoActual);
            $('#saldoDisplay').text("Tu saldo actual es: $" + saldoActual.toLocaleString('es-ES'));
            $('#leyendaDeposito').remove();
            $('#formDepositar').after('<p id="leyendaDeposito" class="text-success text-center mt-3 font-weight-bold">Has depositado: $' + monto.toLocaleString('es-ES') + '</p>');

            var alertaHtml = '<div class="alert alert-success" role="alert">¡Depósito realizado! Redirigiendo...</div>';
            $('#alert-container').html(alertaHtml);
            $('#montoDeposito').val('');
            setTimeout(function () {
                window.location.href = "../menu.html";
            }, 2000);

        } else {
            var alertaError = '<div class="alert alert-danger" role="alert">Monto inválido. Ingrese un número positivo.</div>';
            $('#alert-container').html(alertaError);
        }
    });
});

// SENDMONEY
$(document).ready(function () {
    var saldoInicial = 100000;
    var saldoActual = saldoInicial;

    var saldoGuardado = localStorage.getItem("saldoUsuario");
    if (saldoGuardado != null) {
        saldoActual = parseInt(saldoGuardado);
    }
    
    var contactoElegido = "";
    $("#btnMostrarFormulario").click(function() {
        $("#formularioContacto").toggle(); 
    });

    $("#btnGuardar").click(function() {
        var nombre = $("#nuevoNombre").val();
        var rut = $("#nuevoRUT").val();
        var alias = $("#nuevoAlias").val();
        var banco = $("#nuevoBanco").val();
        if (nombre === "" || rut === "" || banco === "") {
            alert("Ingresa los datos obligatorios.");
            return;
        }

        var htmlContacto = `
            <li class="list-group-item list-group-item-action">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 font-weight-bold">${nombre}</h5>
                    <div class="text-right">
                        <div class="font-weight-bold">Banco: ${banco}</div>
                        <small class="font-weight-bold">RUT: ${rut}</small>
                    </div>
                </div>
            </li>
        `;

        $("#listaContactos").append(htmlContacto);
        $("#formularioContacto").hide();
        $("#nuevoNombre").val("");
        $("#nuevoRUT").val("");
        $("#nuevoAlias").val("");
        $("#nuevoBanco").val("");
        $("#alert-container").html('<div class="alert alert-success alert-dismissible fade show">Contacto agregado <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    });

    $("#listaContactos").on("click", "li", function() {
        $(this).addClass("active").siblings().removeClass("active");
        contactoElegido = $(this).find("h5").text();
        $("#seccionEnviar").fadeIn();
        $("#montoEnviar").focus();
    });

    $("#btnEnviar").click(function() {
        var monto = parseInt($("#montoEnviar").val());
        if (!isNaN(monto) && monto > 0 && monto <= saldoActual) {
            saldoActual -= monto;
            localStorage.setItem("saldoUsuario", saldoActual);

            $("#alert-container").html('<div class="alert alert-success mt-3">Enviaste $' + monto.toLocaleString('es-ES') + ' a ' + contactoElegido + '. Nuevo saldo: $' + saldoActual.toLocaleString('es-ES') + '</div>');

            $("#seccionEnviar").hide();
            $("#montoEnviar").val("");
            $("#listaContactos li").removeClass("active");

        } else if (monto > saldoActual) {
            alert("Fondos insuficientes. Tienes $" + saldoActual.toLocaleString('es-ES'));

        } else {
            alert("Monto inválido.");
        }
    });
});

// TRANSACTIONS

// GLOBAL
$(document).ready(function () {
    $('#menu').click(function () {
        alert("Regresando al menú principal...");
        window.location.href = "../menu.html";
    });
});