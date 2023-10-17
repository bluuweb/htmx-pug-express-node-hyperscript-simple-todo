import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import express from "express";
import crypto from "node:crypto";
import pug from "pug";

// simular db
const todos = [
  {
    id: crypto.randomUUID(),
    title: "Fazer café",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Estudar Node.js",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Estudar React",
    completed: false,
  },
];

const app = express();

// body
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { todos });
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  const todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };

  todos.push(todo);

  const template = pug.compileFile(
    __dirname + "/views/components/todo-item.pug"
  );
  const html = template({ todo });

  res.send(html);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);

  res.send();
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;

  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;

  console.log(todo);

  const template = pug.compileFile(
    __dirname + "/views/components/todo-item.pug"
  );
  const html = template({ todo });

  res.send(html);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
