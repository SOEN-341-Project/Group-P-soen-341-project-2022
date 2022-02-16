"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 4000;
app.get("/", function (req, res) {
    res.send({ sup: "Cool" });
});
app.get("/api/:id", function (req, res) {
    var cool = req.method;
    res.send({ sup: "API", method: cool, id: req.params.id });
});
app.listen(port, function () {
    console.log("listening on port " + port);
});
