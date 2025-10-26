import { prisma } from "@repo/database";
import express from "express";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "hii there"
  });
})

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      users
    });

  } catch (error: any) {
    res.status(411).json({
      msg: error.message
    });
  }
})

app.post("/user", async (req, res) => {

  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username: username || Math.random().toString(),
        password: password || Math.random().toString()
      }
    });

    res.json({
      msg: "user got added",
      user
    });
    
  } catch (error: any) {
    res.status(411).json({
      msg: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log("server is listening at port: " + PORT);
})