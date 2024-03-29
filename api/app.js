import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import  productRoutes from './routes/productRoutes.js';
import  ventaRoutes from './routes/ventaRoutes.js';
import  userRoutes from './routes/userRoutes.js';
import  proveedorRoutes from './routes/proveedorRoutes.js';
import  comprasRoutes from './routes/comprasRoutes.js';
import  connectDataBase from './database/connectdb.js';
import clientsRoutes from "./routes/clientsRoutes.js";
import categorysRoutes from "./routes/categorysRoutes.js";
import emailRoutes from "./routes/emailsRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import cashRoutes from "./routes/cashRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json())
app.use(express.text())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({type:"/"}))
app.use(express.urlencoded({extended:true}))

app.use('/productos', productRoutes);
app.use('/venta', ventaRoutes);
app.use('/usuario', userRoutes);
app.use('/proveedores', proveedorRoutes);
app.use('/clientes', clientsRoutes);
app.use('/compras', comprasRoutes);
app.use(categorysRoutes);
app.use(emailRoutes)
app.use(notesRoutes)
app.use(cashRoutes)



app.get('/', (req, res) => {
  res.send('OBIT SOFTWARE API IS CORRECTRY UPLOAD')
})

app.listen(PORT, () => {
  console.log(`El servidor de OB-IT SOSFTWARE esta funcionando correctamente en el puerto ${PORT} ✔✔`)
  connectDataBase()  
 
})
