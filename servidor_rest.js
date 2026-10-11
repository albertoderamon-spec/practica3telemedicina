var express = require("express");
var app = express();

// 1. Importar el cliente de Supabase
const { createClient } = require('@supabase/supabase-js');

// 2. Configurar con tu URL y tu Public Key (anon key)
const supabaseUrl = 'https://nlffavtboumkxzmaxxkk.supabase.co';
const supabaseKey = 'sb_publishable_4_-MHIl3sW6kSPvkRTmzkQ_3_o_IFQo'; // <--- Pega aquí tu public key
const supabase = createClient(supabaseUrl, supabaseKey);

app.use("/appCliente", express.static("cliente_rest"));
app.use(express.json());

// --- RUTA DE LOGIN ---
app.post("/api/gestores/login", async (req, res) => {
  var usuario = req.body.usuario;
  var contraseña = req.body.contraseña;

  try {
    const { data: gestores, error } = await supabase
      .from('gestores')
      .select('id')
      .eq('usuario', usuario)
      .eq('contrasena', contraseña);

    if (error) {
      console.log("Error al realizar la select", error);
      return res.status(500).json("Error al realizar la consulta");
    }

    if (gestores && gestores.length === 1) {
      res.status(200).json(gestores[0].id);
    } else {
      res.status(403).json("Credenciales incorrectas.");
    }
  } catch (err) {
    console.error("Error en el servidor:", err);
    res.status(500).json("Error interno del servidor");
  }
});

// --- RUTA PARA OBTENER GESTOR POR ID ---
app.get("/api/gestores/:id", async function (req, res) {
  var idGestor = parseInt(req.params.id);

  try {
    const { data: gestores, error } = await supabase
      .from('gestores')
      .select('id, nombre, apellidos, usuario')
      .eq('id', idGestor);

    if (error) {
      console.log("Error al realizar la select", error);
      return res.status(500).json("Error al realizar la consulta");
    }

    if (!gestores || gestores.length === 0) {
      return res.status(404).json("Gestor no encontrado.");
    }
    
    res.status(200).json(gestores[0]);
  } catch (err) {
    console.error("Error en el servidor:", err);
    res.status(500).json("Error interno del servidor");
  }
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
