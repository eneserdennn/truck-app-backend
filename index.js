import express from "express";
import brandsRouter from "./routes/brands.js";
import modelsRouter from "./routes/models.js";
import spareRoutes from "./routes/spares.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/brands", brandsRouter);
app.use("/api/models", modelsRouter);
app.use("/api/spares", spareRoutes);
// app.get("/api/:id", (req, res) => {
//   const q = "SELECT * FROM brands b JOIN models m ON b.id=m.brandID";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.get("/brands", (req, res) => {
//   const q = "SELECT * FROM brands";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });
// app.get("/brand", (req, res) => {
//   const q = "SELECT * FROM brands b JOIN models m ON b.id=m.brandID";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.post("/addtruck", (req, res) => {
//   const values = [req.body.idtrucks, req.body.truckname];
//   const q = "INSERT INTO trucks (`idtrucks`,`truckname`) VALUES (?)";
//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);

//     return res.json("olmuskeee");
//   });
// });

app.listen(8800, () => {
  console.log("app connected");
});
// PRODUCTS ROUTE

// app.get("/trucks", (req, res) => {
//   const q = "SELECT * FROM products";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

//----------------//

// MODELS ROUTE
// app.get("/models", (req, res) => {
//   const q = "SELECT * FROM products";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });
