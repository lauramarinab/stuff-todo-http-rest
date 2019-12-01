import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { schemas } from "./schemas";
import { middleware } from "./middleware";

import { pool } from "./config";
import {
  LIST_TODO_QUERY,
  TODO_BY_ID,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_ALL_TRASHED_TODOS,
  UPDATE_TODO
} from "./queries";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/hello/:name", (req: Request, res: Response) => {
  res.send(`Hello World, ${req.params.name}!`);
});

// all todos
app.get("/todo", async (req: Request, res: Response) => {
  const isTrashed = req.query.trash === "true";

  try {
    const queryResult = await pool.query(LIST_TODO_QUERY, [isTrashed]);
    res.status(200).send(queryResult.rows);
  } catch (err) {
    throw err;
  }
});

// todo by id
app.get("/todo/:id", async (req: Request, res: Response) => {
  const todoId = req.params.id;

  try {
    const queryResult = await pool.query(TODO_BY_ID, [todoId]);
    res.status(200).send(queryResult.rows);
  } catch (err) {
    throw err;
  }
});

// create todo
app.post("/todo", middleware(schemas.addTodo), async (req: Request, res: Response) => {
  const { body } = req;

  const userId = body.userId ? body.userId : "1";

  try {
    const queryResult = await pool.query(CREATE_TODO, [body.description, userId]);
    res.status(201).send(queryResult.rows[0]);
  } catch (err) {
    throw err;
  }
});

// update todo

// gestire errori
// riguardare i parametri che ho passato a UPDATE_TODO e faccio la stessa cosa a list_todo
app.patch("/todo/:id", middleware(schemas.updateTodo), async (req: Request, res: Response) => {
  const { body } = req;

  const updateParams = Object.entries(body).reduce((acc, [k, v], i) => {
    return [...acc, { param: `${k} = $${i + 1}`, value: v }];
  }, []);

  if (updateParams.length) {
    const update = `set ${updateParams.map(up => up.param).join(", ")} where id = $${updateParams.length + 1}`;
    const updateParamsValue = updateParams.map(up => up.value);
    try {
      await pool.query(UPDATE_TODO(update), [...updateParamsValue, req.params.id]);

      const updatedTodoQueryResult = await pool.query(TODO_BY_ID, [req.params.id]);

      res.status(200).send(updatedTodoQueryResult.rows[0]);
    } catch (err) {
      throw err;
    }
  } else {
    res.status(400).send("You must send at least one parameter");
  }
});

// delete todo or all completed todos in trash
app.delete("/todo/:id?", async (req: Request, res: Response) => {
  const todoId = req.params.id;

  if (todoId) {
    try {
      const queryResult = await pool.query(DELETE_TODO, [todoId]);
      res.status(200).send({ deletedRows: queryResult.rowCount });
    } catch (err) {
      throw err;
    }
  } else {
    try {
      const queryResult = await pool.query(DELETE_ALL_TRASHED_TODOS);
      res.status(200).send({ deletedRows: queryResult.rowCount });
    } catch (err) {
      throw err;
    }
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
