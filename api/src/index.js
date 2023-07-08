const express = require('express')
const sequelize = require('./database/database')
const cors = require('cors')

require('./models/Connection')
// require('./models/Activity')
// require('./models/Country')

const routes = require('./routes/index')

const app = express();
const PORT = 8888;

app.use(cors())
app.use(express.json())

app.use('/', routes);

async function main(){
    //dbConection
    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        app.listen(PORT,()=>{
        console.log(`Server on port ${PORT}`)
    });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
main();