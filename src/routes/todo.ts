import { Request, Response, NextFunction, Router } from "express";

import client from "../util/db";
import newTodoValidator from "../validate/newTodo";
import { generateRandomString } from "../util/random";

const router = Router();

router.get("/", async (_, res) => {
  const db = client.db("todo");
  const collection = db.collection("todo");
  const allDocs = await collection.find().toArray();
  const santizedDocs = allDocs.map((doc) => {
    return { title: doc.title, body: doc.body, creator: doc.creator };
  });

  res.send({ items: santizedDocs, count: santizedDocs.length });
});

router.get("/:id", async (req, res) => {
  const db = client.db("todo");
  const collection = db.collection("todo");
  const response = await collection.findOne({
    id: req.params.id,
  });

  if (!response) {
    res.status(404);
    return;
  }

  const { title, creator, body } = response;

  res.send({ title, creator, body });
});

router.put("/", newTodoValidator.validate, async (req, res) => {
  const { title, creator, body } = req.body;
  const db = client.db("todo");
  const collection = db.collection("todo");
  const id = generateRandomString();

  const doc = await collection.insertOne({ title, creator, body, id });
  res.send({ id });
});

router.delete("/:id", async (req, res) => {
  const db = client.db("todo");
  const collection = db.collection("todo");
  await collection.deleteOne({ id: req.params.id });
  res.send({ status: "ok" });
});

export default router;
