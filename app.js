const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Conexão com a DB
const url = "mongodb+srv://usuario_admin:Theflash@123@clusterapi-j2sqh.mongodb.net/test?retryWrites=true&w=majority"
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };
 
mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", (err) => {
    console.log("Erro na conexão com o banco de dados: " + err)
});

mongoose.connection.on("disconnected", () => {
    console.log("Aplicação desconectada do banco de dados!")
});

mongoose.connection.on("connected", () => {
    console.log("Aplicação conectada ao Banco de Dados")
});

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json());

const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");

app.use("/", indexRoute);
app.use("/users", usersRoute);

app.listen(3000);

module.exports = app;