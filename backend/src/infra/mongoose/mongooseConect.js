const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connectDB() {
  try {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      // Iniciar MongoDB em memória para desenvolvimento
      const mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      await mongoose.connect(mongoUri);
      console.log('Conectado ao MongoDB em memória');
    } else if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Conectado ao MongoDB');
    } else {
      throw new Error('MONGO_URI is required outside development and test environments');
    }
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

module.exports = connectDB;