const conn = require("../../db/dbconnection");
module.exports = {
  obtenerTipoEvento: async (req, res) => {
    try {
      const sql = `SELECT id,nombre FROM tipo_evento`;
      const [rows, fields] = await conn.query(sql);
      res.json(rows);
    } catch (error) {
      console.error("Error al obtener el tipo de evento:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  obtenerEspacios: async (req, res) => {
    try {
      const sql = `select esp.id,esp.direccion,esp.nombre,esp.capacidad,(select te.nombre from tipo_evento te where te.id =e.tipo_evento_id) evento 
from eventos e, espacios esp where e.tipo_evento_id =esp.evento_id`;
      const [rows] = await conn.query(sql);
      res.render("espacios/listar", {
        tituloDePagina: "Listado de Espacios",
        espacios: rows,
      });
    } catch (error) {
      console.error("Error al obtener el listado:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  mostrarFormularioEditar: async (req, res) => {
    try {
      let espacio = {
        id: "",
        nombre: "",
        direccion: "",
        capacidad: "",
        evento_id: "",
      };

      // Obtener los tipos de evento disponibles
      const sqlTipoEvento = `SELECT id, nombre FROM tipo_evento`;
      const [tipoEventos] = await conn.query(sqlTipoEvento);

      // Si se proporciona un ID válido en la URL, buscar el espacio correspondiente
      if (req.params.id) {
        const [rows] = await conn.query("SELECT * FROM espacios WHERE id = ?", [
          req.params.id,
        ]);
        espacio = rows[0];
      }
      res.render("espacios/crear-editar", {
        tituloDePagina: req.params.id
          ? "Editar Espacio"
          : "Crear Nuevo Espacio",
        action: req.params.id
          ? `/espacios/${espacio.id}?_method=PUT`
          : "/espacios",
        buttonText: req.params.id ? "Actualizar" : "Crear",
        espacio: espacio,
        tipoEventos: tipoEventos, // Pasar los tipos de evento a la vista
      });
    } catch (error) {
      console.error("Error al obtener el espacio:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  /*
  obtenerEspacioPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const sql = `SELECT * FROM espacios WHERE id = ?`;
      const [rows, fields] = await conn.query(sql, [id]);
      if (rows.length === 0) {
        res.status(404).json({ error: "Espacio no encontrado" });
        return;
      }
      res.json(rows[0]);
    } catch (error) {
      console.error("Error al obtener el espacio:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  eliminarEspacio: async (req, res) => {
    const { id } = req.params;
    try {
      const sql = `DELETE FROM espacios WHERE id = ?`;
      await conn.query(sql, [id]);
      res.json({ message: "Espacio eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el espacio:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
*/

  crearEspacio: async (req, res) => {
    try {
      const { nombre, direccion, capacidad, evento_id } = req.body;
      const sql = `INSERT INTO espacios (nombre, direccion, capacidad, evento_id) VALUES (?, ?, ?, ?)`;
      const [resultado, fields] = await conn.query(sql, [
        nombre,
        direccion,
        capacidad,
        evento_id,
      ]);
      console.log(resultado);

      if (resultado && resultado.affectedRows > 0) {
        res.redirect(`/espacios/editar/${resultado.insertId}`);
      } else {
        res.status(500).json({ error: "Error al crear el espacio" });
      }
    } catch (error) {
      console.error("Error al crear el espacio:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  actualizarEspacio: async (req, res) => {
    try {
      const { nombre, direccion, capacidad, evento_id } = req.body;
      console.log(req.body);
      await conn.query(
        "UPDATE espacios SET nombre = ?, direccion = ?, capacidad = ?, evento_id= ? WHERE id = ?",
        [nombre, direccion, capacidad, evento_id, req.params.id]
      );
      res.redirect("/espacios");
    } catch (error) {
      console.error("Error al actualizar el espacio:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  eliminarEspacio: async (req, res) => {
    try {
      const eliminado = await conn.query(`DELETE FROM espacios WHERE id = ?`, [
        req.params.id,
      ]);

      console.log(eliminado);

      res.redirect("/espacios");
    } catch (error) {
      console.error("Error al intentar eliminar el espacio:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  crearContacto: async (req, res) => {
    const sql = `INSERT INTO contactos (NOMBRE, EMAIL,CELULAR,TIPO,FECHA_EVENTO,COMENTARIO,FECHA_CREACION) VALUE(?,?,?,?,?,?,sysdate())`;
    const creado = await conn.query(sql, [
      req.body.nombre,
      req.body.email,
      req.body.celular,
      req.body.tipo,
      req.body.fechaEvento,
      req.body.comentario,
    ]);
    console.log(creado);

    res.redirect("/eventos.html");
  },
};
