let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDB = require('./database/db');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGUSERNAME}:${process.env.MONGPASSWORD}@cluster0.wyk9c.mongodb.net/${process.env.MONGDATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connect database success");
});

const bookRoute = require('./routes/book.route')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.use('/api', bookRoute);



app.listen(process.env.PORT, () => console.log("Listening on port " + process.env.PORT))

app.use((req, res, next) => {
    new (crearError(404));
})

app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})