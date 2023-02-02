import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import clientRoutes from "./routes/clients.routes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/clients", clientRoutes);

app.use(handleErrorMiddleware);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

export default app;
