const mongoose = require('mongoose');


const dbConnect = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos conectada');
    } catch (error) {
        throw new Error('Error al iniciar la base de datos.');
    }
};


module.exports = {dbConnect};