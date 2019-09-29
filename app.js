const express = require("express");
const fortunes = require("./data/fortunes.json");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.json());

app.get("/fortunes", (req,res)=> {
    res.json(fortunes);
});

app.get("/fortunes/:id", (req,res)=> {
    const fortune = fortunes.find((f)=>{
        return f.id == req.params.id;
    });
    res.json(fortune);
});

app.post("/fortunes", (req, res)=> {
    const {message, lucky_number, spirit_animal } = req.body;
    const ids = fortunes.map((f)=>{
        return f.id;
    });

    const fortune = {
        id: (ids.length > 0 ? Math.max(...ids):0) + 1 ,
        message, 
        lucky_number, 
        spirit_animal};
    const fortunes_new = fortunes.concat(fortune);

    fs.writeFile("./data/fortunes.json", JSON.stringify(fortunes_new), err=> console.log(err));

    res.json(fortunes_new);

});

module.exports = app;