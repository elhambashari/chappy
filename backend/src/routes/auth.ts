
import express from "express";
import { db } from "../data/db.js";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const router = express.Router();

// LOGIN route
router.post("/login", async (req, res) => {
  console.log("📩 Received POST /api/auth/login request");

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // DynamoDB: get the user
    const command = new GetCommand({
      TableName: "chappy",
      Key: {
        pk: `USER#${username}`,
        sk: `PROFILE#${username}`,
      },
    });

    const result = await db.send(command);

    if (!result.Item) {
      console.log("❌ User not found:", username);
      return res.status(404).json({ error: "User not found" });
    }

    
    if (result.Item.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ Login successful for user:", username);

    res.json({
      message: "Login successful",
      user: {
        username: result.Item.username,
        email: result.Item.email,
      },
    });
  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
