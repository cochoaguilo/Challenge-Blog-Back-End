const express = require ('express');
const app = express();
const port = process.env.port || 4700;
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));


// traigo rutas del blog

const blogsRoutes = require('./routes/blogs.routes')



app.use('/blogs', blogsRoutes);



app.listen(port,  () => {
    console.log(`Server listeting on port ${port}`);
  });