
const app = require('./src/app.js');
const connectDB = require('./src/config/database.js');

const port = 3000; 

const startServer = async () => {
    try {
      
        await connectDB();

     
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });

    } catch(error) {
        console.log('No se ha podido levantar el servidor', error);
        process.exit(1);
    }
}

startServer();
