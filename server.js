const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/urlShorten");

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const connectionString = process.env.MONGOOSE_URI;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully.');
    }).catch(err => { console.log('Database connection error') });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname });
});

app.get('/stats', (req, res) => {
    res.sendFile('views/stats.html', { root: __dirname });
});

app.get('/expired', (req, res) => {
    res.sendFile('views/expired.html', { root: __dirname });
});

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})

module.exports = app;