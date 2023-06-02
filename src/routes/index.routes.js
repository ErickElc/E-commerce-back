const productRouter = require("./product.routes");
const entregaRouter = require("./entrega.routes");
const adminRouter = require("./admin.routes");
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const express = require("express");

const routes = (app) => {
  app.use(
    "/api",
    express.urlencoded({ extended: false }),
    userRouter,
    productRouter,
    entregaRouter,
    adminRouter
  );
  app.use("/auth", express.urlencoded({ extended: false }), authRouter);
};

module.exports = routes;
