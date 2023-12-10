const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');

app.listen(9992, function () {
    console.log("Server started on port 9992");
});

mongoose.connect("mongodb://localhost:27017/abc", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to DB");
    })
    .catch((error) => {
        console.error("Error connecting to DB:", error.message);
    });

app.use(express.json());
app.use(cors());
app.use('/api', routes);
