var seccionActual = "acceso";


function cambiarSeccion(seccion){ 
    document.getElementById(seccionActual).style.display = "none";
    console.log(seccionActual,seccion);
    document.getElementById(seccion).style.display = "block";
    seccionActual = seccion;
}



function login() {
    var gestor = {
        usuario: document.getElementById("usuario").value,
        contraseña: document.getElementById("contraseña").value
    };

    rest.post("/api/gestores/login", gestor, function(estado, respuesta) {
        if(estado == 200) {
            idGestorActual = respuesta;
            cambiarSeccion('home');
            saludo(idGestorActual);
            seccionActual = 'home';
        } else {
            alert("Credenciales incorrectas.");
        }
    });
}

function saludo(id) {
    rest.get("/api/gestores/" + id, function(estado, respuesta) {
        if (estado == 200) {
            var nombreCompleto = respuesta.nombre + " " + respuesta.apellidos;
            document.getElementById("texto_bienvenida").innerHTML = "Bienvenido/a " + nombreCompleto;         

        } 
    });
}
