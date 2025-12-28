// GLOBAL
function registrarMovimiento(tipo, descripcion, monto) {
    var historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
    var fecha = new Date().toLocaleDateString();
    historial.push({
        tipo: tipo,
        fecha: fecha,
        descripcion: descripcion,
        monto: monto
    });
    localStorage.setItem("historialMovimientos", JSON.stringify(historial));
}
$(document).ready(function () {
    $('#menu').click(function () {
        alert("Regresando al menú principal...");
        window.location.href = "../menu.html";
    });

    // LOGIN
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

    // MENU
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

    var historialGuardado = localStorage.getItem("historialMovimientos");

    if (historialGuardado == null) {
        localStorage.setItem("saldoUsuario", saldoActual);
        registrarMovimiento('ingreso', 'Depósito Inicial', saldoInicial);

    } else {
        var saldoGuardado = localStorage.getItem("saldoUsuario");
        if (saldoGuardado != null) {
            saldoActual = parseInt(saldoGuardado);
        }
    }
    if ($('#saldoActual').length) {
        $('#saldoActual').text("Saldo actual: $" + saldoActual.toLocaleString('es-ES'));
    }

    // DEPOSIT
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

        registrarMovimiento('ingreso', 'Depósito en cuenta', monto);
    });

    // SENDMONEY
    var saldoInicial = 100000;
    var saldoActual = saldoInicial;

    var saldoGuardado = localStorage.getItem("saldoUsuario");
    if (saldoGuardado != null) {
        saldoActual = parseInt(saldoGuardado);
    }

    var contactoElegido = "";
    $("#btnMostrarFormulario").click(function () {
        $("#formularioContacto").toggle();
    });

    $("#btnGuardar").click(function () {
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

    $("#listaContactos").on("click", "li", function () {
        $(this).addClass("active").siblings().removeClass("active");
        contactoElegido = $(this).find("h5").text();
        $("#seccionEnviar").fadeIn();
        $("#montoEnviar").focus();
    });

    $("#btnEnviar").click(function () {
        var monto = parseInt($("#montoEnviar").val());
        if (!isNaN(monto) && monto > 0 && monto <= saldoActual) {
            saldoActual -= monto;
            localStorage.setItem("saldoUsuario", saldoActual);

            $("#alert-container").html('<div class="alert alert-success mt-3">Enviaste $' + monto.toLocaleString('es-ES') + ' a ' + contactoElegido + '. Tu nuevo saldo es de: $' + saldoActual.toLocaleString('es-ES') + '</div>');
            $("#seccionEnviar").hide();
            $("#montoEnviar").val("");
            $("#listaContactos li").removeClass("active");

        } else if (monto > saldoActual) {
            alert("Fondos insuficientes.");

        } else {
            alert("Monto inválido.");
        }

        registrarMovimiento('egreso', 'Transferencia a ' + contactoElegido, monto);
    });

    // TRANSACTIONS
    if ($('#cuerpoTabla').length) {
        function dibujarTabla(filtro) {
            var historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
            var tbody = $('#cuerpoTabla');
            tbody.empty();
            var contador = 0;
            historial.reverse().forEach(function (mov) {
                var mostrar = false;
                if (filtro === 'todos') mostrar = true;
                else if (filtro === 'deposito' && mov.tipo === 'ingreso') mostrar = true;
                else if (filtro === 'envio' && mov.tipo === 'egreso') mostrar = true;
                if (mostrar) {
                    var claseColor = mov.tipo === 'ingreso' ? 'text-success' : 'text-danger';
                    var signo = mov.tipo === 'ingreso' ? '+' : '-';
                    var icono = mov.tipo === 'ingreso' ? '⬋' : '⬈';
                    var fila = `
                        <tr>
                            <td>${mov.fecha}</td>
                            <td>
                                <strong>${icono} ${mov.descripcion}</strong>
                            </td>
                            <td class="text-right font-weight-bold ${claseColor}">
                                ${signo}$${mov.monto.toLocaleString('es-ES')}
                            </td>
                        </tr>
                    `;
                    tbody.append(fila);
                    contador++;
                }
            });
            if (contador === 0) {
                $('#mensajeVacio').show();
                if (filtro !== 'todos') {
                    $('#mensajeVacio').text("No hay movimientos de este tipo.");
                }
            } else {
                $('#mensajeVacio').hide();
            }
        }
        dibujarTabla('todos');
        $('#filtroMovimientos').change(function () {
            var valorSeleccionado = $(this).val();
            dibujarTabla(valorSeleccionado);
        });
    }
});

// Le tuve que pedir mucha asistencia a Gemini y me tomó horas, pero se logró!