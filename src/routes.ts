import express from "express";

export const routes = express.Router();

const barman = {
  preparing: {
    beers: 0,
    drinks: 0,
  },
  servedDrinks: [],
  servedCustomers: [],
  prepareTime: 5, // Default preparation time
  maxElementos: 25, // Default max elements shown in the served array
};


const agregarComanda = (elemento, arr) => {
  arr.unshift(elemento); // Agrega el elemento al inicio del array

  if (arr.length > barman.maxElementos) {
    arr.splice(-1, 1); // Elimina el último elemento si el array tiene más de 5 elementos
  }
};

routes.get("/served", (req, res) => {
  res.json({
    servedDrinks: barman.servedDrinks,
    servedCustomers: barman.servedCustomers,
  });
});

routes.get("/reset", (req, res) => {
  barman.servedCustomers = [];
  barman.servedDrinks = [];
  res.status(200).send("Reset succesfull");
});

routes.get("/config", (req, res) => {
  res.json({
    prepareTime: barman.prepareTime,
    maxElementos: barman.maxElementos,
  });
});

routes.post("/config", (req, res) => {
  const { maxElementos, prepareTime } = req.body;
  barman.maxElementos = maxElementos;
  barman.prepareTime = prepareTime;
  res.status(200).send(`Config updated. Max elements:${barman.maxElementos} preparation time:${barman.prepareTime}`);
});

routes.post("/order", (req, res) => {
  const { userId, drinkType } = req.body;

  if (drinkType === "BEER" && barman.preparing.beers < 2) {
    barman.preparing.beers++;
  } else if (drinkType === "DRINK" && barman.preparing.drinks < 1) {
    barman.preparing.drinks++;
  } else {
    res.status(429).send("Order is not accepted at the moment");
    return;
  }

  setTimeout(() => {
    agregarComanda({ userId, drinkType }, barman.servedDrinks);
    agregarComanda(userId, barman.servedCustomers);

    if (drinkType === "BEER") {
      barman.preparing.beers--;
    } else {
      barman.preparing.drinks--;
    }
  }, barman.prepareTime * 1000);

  res.status(200).send("Drink will be served");
});
