"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
exports.routes = express_1.default.Router();
const barman = {
    preparing: {
        beers: 0,
        drinks: 0,
    },
    servedDrinks: [],
    servedCustomers: [],
    prepareTime: 5,
    maxElementos: 25, // Default max elements shown in the served array
};
const agregarComanda = (elemento, arr) => {
    arr.unshift(elemento); // Agrega el elemento al inicio del array
    if (arr.length > barman.maxElementos) {
        arr.splice(-1, 1); // Elimina el último elemento si el array tiene más de 5 elementos
    }
};
exports.routes.get("/served", (req, res) => {
    res.json({
        servedDrinks: barman.servedDrinks,
        servedCustomers: barman.servedCustomers,
    });
});
exports.routes.get("/reset", (req, res) => {
    barman.servedCustomers = [];
    barman.servedDrinks = [];
    res.status(200).send("Reset succesfull");
});
exports.routes.get("/config", (req, res) => {
    res.json({
        prepareTime: barman.prepareTime,
        maxElementos: barman.maxElementos,
    });
});
exports.routes.post("/config", (req, res) => {
    const { maxElementos, prepareTime } = req.body;
    barman.maxElementos = maxElementos;
    barman.prepareTime = prepareTime;
    res.status(200).send(`Config updated. Max elements:${barman.maxElementos} preparation time:${barman.prepareTime}`);
});
exports.routes.post("/order", (req, res) => {
    const { userId, drinkType } = req.body;
    if (drinkType === "BEER" && barman.preparing.beers < 2) {
        barman.preparing.beers++;
    }
    else if (drinkType === "DRINK" && barman.preparing.drinks < 1) {
        barman.preparing.drinks++;
    }
    else {
        res.status(429).send("Order is not accepted at the moment");
        return;
    }
    setTimeout(() => {
        agregarComanda({ userId, drinkType }, barman.servedDrinks);
        agregarComanda(userId, barman.servedCustomers);
        if (drinkType === "BEER") {
            barman.preparing.beers--;
        }
        else {
            barman.preparing.drinks--;
        }
    }, barman.prepareTime * 1000);
    res.status(200).send("Drink will be served");
});
//# sourceMappingURL=routes.js.map