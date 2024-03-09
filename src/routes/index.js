"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var petRouter_1 = require("../routes/petRouter");
var router = function (app) {
    app.use("/pets", petRouter_1.default);
};
exports.default = router;
