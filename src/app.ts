import express, { Application, RequestHandler } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./routers";

const app: Application = express();

app.use(express.json());

const corseOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corseOptions));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hey there! I am running");
});

app.use(globalErrorHandler as unknown as RequestHandler);
app.use(notFound as unknown as RequestHandler);

export default app;