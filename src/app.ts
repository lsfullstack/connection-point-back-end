import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import clientRoutes from "./routes/clients.routes";
import contactRoutes from "./routes/contacts.routes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/clients", clientRoutes);
app.use("/contacts", contactRoutes);

app.use(handleErrorMiddleware);

export default app;
