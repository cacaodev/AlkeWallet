// GLOBAL
function registrarMovimiento(tipo, descripcion, monto) {
    let historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
    let fecha = new Date().toLocaleDateString();
    historial.push({
        tipo: tipo,
        fecha: fecha,
        descripcion: descripcion,
        monto: monto
    });
    localStorage.setItem("historialMovimientos", JSON.stringify(historial));
}

$(document).ready(function () {
let saldoInicial = 100000;
let saldoActual = saldoInicial;
let saldoGuardado = localStorage.getItem("saldoUsuario");
if (saldoGuardado != null) {
    saldoActual = parseInt(saldoGuardado);
}
let saldoDestinatario = 0;

$('#menu').click(function () {
        if (window.location.pathname.includes('/feature/')) {
            window.location.href = "../menu.html";
        } else {
            window.location.href = "menu.html";
        }
    });

    // LOGIN
    $('#loginForm').submit(function (event) {
        event.preventDefault();
        let emailIngresado = $('#exampleInputEmail1').val();
        let contrasenaIngresada = $('#exampleInputPassword1').val();
        let usuarioValido = 'camila@alkewallet.com';
        let contrasenaValida = 'contraseña123';

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
        window.location.href = "feature/deposit.html";
    });

    $("#sendMoney").click(function () {
        window.location.href = "sendmoney.html";
    });

    $("#transactions").click(function () {
        window.location.href = "feature/transactions.html";
    });

    $("#logout").click(function () {
        window.location.href = "index.html";
    });

    if ($('#saldoActual').length) {
        $('#saldoActual').text("Saldo actual: $" + saldoActual.toLocaleString('es-ES'));
    }

    let historialGuardado = localStorage.getItem("historialMovimientos");

    if (historialGuardado == null) {
        localStorage.setItem("saldoUsuario", saldoActual);
        registrarMovimiento('ingreso', 'Depósito Inicial', saldoInicial);

    } else {
        let saldoGuardado = localStorage.getItem("saldoUsuario");
        if (saldoGuardado != null) {
            saldoActual = parseInt(saldoGuardado);
        }
    }
    if ($('#saldoActual').length) {
        $('#saldoActual').text("Saldo actual: $" + saldoActual.toLocaleString('es-ES'));
    }

    // DEPOSIT
    if ($('#saldoDisplay').length) {
        $('#saldoDisplay').text("Tu saldo actual es: $" + saldoActual.toLocaleString('es-ES'));
    }

    $('#formDepositar').submit(function (event) {
        event.preventDefault();
        let monto = parseInt($('#montoDeposito').val());

        if (!isNaN(monto) && monto > 0) {
            saldoActual += monto;
            localStorage.setItem("saldoUsuario", saldoActual);
            $('#saldoDisplay').text("Tu saldo actual es: $" + saldoActual.toLocaleString('es-ES'));
            $('#leyendaDeposito').remove();
            $('#formDepositar').after('<p id="leyendaDeposito" class="text-success text-center mt-3 font-weight-bold">Has depositado: $' + monto.toLocaleString('es-ES') + '</p>');

            let alertaHtml = '<div class="alert alert-success" role="alert">¡Depósito realizado! Redirigiendo...</div>';
            $('#alert-container').html(alertaHtml);
            $('#montoDeposito').val('');
            setTimeout(function () {
                window.location.href = "../menu.html";
            }, 2000);
            
            registrarMovimiento('ingreso', 'Depósito en cuenta', monto);

        } else {
            let alertaError = '<div class="alert alert-danger" role="alert">Monto inválido. Ingrese un número positivo.</div>';
            $('#alert-container').html(alertaError);
        }
    });

    // SENDMONEY
    let contactoElegido = "";
    $("#btnMostrarFormulario").click(function () {
        $("#formularioContacto").toggle();
    });

    $("#btnGuardar").click(function () {
        let nombre = $("#nuevoNombre").val();
        let rut = $("#nuevoRUT").val();
        let alias = $("#nuevoAlias").val();
        let banco = $("#nuevoBanco").val();
        if (nombre === "" || rut === "" || banco === "") {
            alert("Ingresa los datos obligatorios.");
            return;
        }

        let htmlContacto = `
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
        let monto = parseInt($("#montoEnviar").val());
        if (!isNaN(monto) && monto > 0 && monto <= saldoActual) {
            saldoActual -= monto;
            localStorage.setItem("saldoUsuario", saldoActual);
            saldoDestinatario += monto;

            $("#alert-container").html('<div class="alert alert-success mt-3">Enviaste $' + monto.toLocaleString('es-ES') + ' a ' + contactoElegido + '. Tu nuevo saldo es de: $' + saldoActual.toLocaleString('es-ES') + '. El saldo del destinatario ahora es de $' + saldoDestinatario.toLocaleString('es-ES') + '.' + '</div>');
            $("#seccionEnviar").hide();
            $("#montoEnviar").val("");
            $("#listaContactos li").removeClass("active");

            registrarMovimiento('egreso', 'Transferencia a ' + contactoElegido, monto);
        
            console.log("Saldo del destinatario: $" + saldoDestinatario);

        } else if (monto > saldoActual) {
            alert("Fondos insuficientes.");

        } else {
            alert("Monto inválido.");
        }
    });

    $("#buscadorContacto").on("keyup", function() {
        let valor = $(this).val().toLowerCase();
        $("#listaContactos li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1)
        });
    });

    // TRANSACTIONS
    if ($('#cuerpoTabla').length) {
        function dibujarTabla(filtro) {
            let historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
            let tbody = $('#cuerpoTabla');
            tbody.empty();
            let contador = 0;
            historial.reverse().forEach(function (mov) {
                let mostrar = false;
                if (filtro === 'todos') mostrar = true;
                else if (filtro === 'deposito' && mov.tipo === 'ingreso') mostrar = true;
                else if (filtro === 'envio' && mov.tipo === 'egreso') mostrar = true;
                if (mostrar) {
                    let claseColor = mov.tipo === 'ingreso' ? 'text-success' : 'text-danger';
                    let signo = mov.tipo === 'ingreso' ? '+' : '-';
                    let icono = mov.tipo === 'ingreso' ? '⬋' : '⬈';
                    let fila = `
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
            let valorSeleccionado = $(this).val();
            dibujarTabla(valorSeleccionado);
        });
    }
});

// Le tuve que pedir mucha asistencia a Gemini y me tomó horas, pero se logró!
// Me cuesta mucho entender la lógica del localstorage sin ayuda así que solo dejé la que ya tenía, el saldo del destinatario siempre parte desde 0 y no se guarda en la memoria