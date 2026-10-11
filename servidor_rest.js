var express = require("express");
var app = express();

const mysql = require('mysql');
const database = {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'practica3telemedicina'
};

const conexion = mysql.createConnection(database);

conexion.connect(function (err) {
    if (err) {
        console.error('Error en la conexión de la base de datos:',err);
        process.exit();
    }
});


app.use("/appCliente", express.static("cliente_rest"));
app.use(express.json());


app.post("/api/gestores/login", (req, res) => {
  var usuario = req.body.usuario;
  var contraseña = req.body.contraseña;

  var sql = "SELECT id FROM gestores WHERE usuario = ? AND contrasena = ?";
  conexion.query(sql, [usuario, contraseña], function (err, gestores) {
    if (err) {
      console.log("Error al realizar la select", err);
      return res.status(500).json("Error al realizar la consulta");
    }
    if (gestores.length === 1) {
      res.status(200).json(gestores[0].id);
    } else {
      res.status(403).json("Credenciales incorrectas.");
    }
  });
});


app.get("/api/gestores/:id", function (req, res) {
  var idGestor = parseInt(req.params.id);
  var sql = "SELECT id, nombre, apellidos, usuario FROM gestores WHERE id = ?";

  conexion.query(sql, [idGestor], function (err, gestores) {
    if (err) {
      console.log("Error al realizar la select", err);
      return res.status(500).json("Error al realizar la consulta");
    }
    if (gestores.length === 0) {
      return res.status(404).json("Gestor no encontrado.");
    }
    res.status(200).json(gestores[0]);
  });
});


app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
