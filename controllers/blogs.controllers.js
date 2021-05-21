const sequelize = require('../conexion');


const getBlogslist =  async (req, res) => {
    //raw query
    const query = `SELECT b.id, b.Titulo, b.Imagen, b.Fecha, c.name 
                  FROM Blog b
                  LEFT JOIN Categoria c using(id_categoria)
                  ORDER BY b.Fecha DESC`;
    try {
      //llamado a la BD a traves de sequelize. Tipo select
      const QuerySelect = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(QuerySelect);
    } catch(e) {
      console.log(e);
    }
  };

  const getBlogbyID =  async (req, res) => {
    const id = req.params.id
    //raw query
    const query = `SELECT b.*, c.name 
                  FROM Blog b
                  LEFT JOIN Categoria c using(id_categoria)
                  where b.id = ${id}`;
    try {
      //llamado a la BD a traves de sequelize. Tipo select
      const QuerySelectbyID = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(QuerySelectbyID);
    } catch(e) {
      console.log(e);
    }
  };

const newBlog =   async(req, res) => {
  
    try {
      
      const {title, content, image, date, category} = req.body;

      //raw query que inserta los nuevos valores
      let queryNewBlog = `INSERT into Blog(Titulo, Contenido, Imagen, Fecha, id_categoria)
                        VALUES(?,?,?,?,?)`

      //query para encontrar el id de categoria en base al nombre
      const queryCategoria = 
      `SELECT id_categoria                       
      FROM Categoria
      WHERE name = '${category}'`;
        
      let Category = await sequelize.query(queryCategoria, {type:sequelize.QueryTypes.SELECT})

      

      sequelize.query(queryNewBlog, {
        replacements: [
          title, content, image, date, Category[0].id_categoria
        ]
      }).then((response)=>{
        res.send({mensaje: 'send', operation: req.body});
      })
    } catch(e) {
      console.log(e);
    }
};
const deleteBlog = async (req,res)=>{
    
    const queryDelete = 'DELETE FROM Blog WHERE id= ?';
    try{
    sequelize.query(queryDelete, {
      replacements:[req.params.id]
    }).then((data => {
      res.send({status: 'eliminated'});
    }))}
    catch(e){
      res.status(400).json({
        message: 'El blog no existe'
      });
      console.log(e)
    }
};

const updateBlog = async (req, res) =>{
  
  
  try {
    
    const {title, content, image, date, category} = req.body;

    const queryCategoria = 
    `SELECT id_categoria                       
    FROM Categoria
    WHERE name = '${category}'`;
      
    let Category = await sequelize.query(queryCategoria, {type:sequelize.QueryTypes.SELECT})

      await sequelize.query(`UPDATE  Blog
      SET  Titulo= "${title}",
      Contenido = "${content}",
      Imagen = "${image}",
      Fecha = "${date}",
      id_categoria = "${Category[0].id_categoria}"
      WHERE id = ${req.params.id}`,
      { type: sequelize.QueryTypes.INSERT })
      .then((data =>{

        res.status(201).json({
          message: 'operation updated',
          data:req.body
      })
      })
      
      )

  } catch (error) {
      console.log(`error en la inserción ${error}`)
  }
}  


module.exports = {
  getBlogslist,
  getBlogbyID,
  newBlog,
  deleteBlog,
  updateBlog
} 
