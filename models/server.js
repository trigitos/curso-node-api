const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.pathUsuarios = '/api/usuarios';

        //DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.pathUsuarios, require('../routes/user'));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }

    conectarDB() {
        dbConnect();
    }
}

module.exports = Server;