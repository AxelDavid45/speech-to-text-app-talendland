const mongoose = require('mongoose');
const {
  mongoDb,
  mongoUser,
  mongoHost,
  mongoPass
} = require('../configs/index');

class MongooseLib {
  constructor () {
    this.connection = mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDb}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true });
  }
}


module.exports = MongooseLib;

