
import express from "express";
import { db } from "../data/db.js";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    console.log("🔍 Fetching user profiles from DynamoDB...");

    const command = new ScanCommand({
      TableName: "chappy",
      FilterExpression: "begins_with(pk, :userPrefix) AND begins_with(sk, :profilePrefix)",
      ExpressionAttributeValues: {
        ":userPrefix": "USER#",
        ":profilePrefix": "PROFILE#",
      },
    });

    const result = await db.send(command);

    res.json(result.Items);
  } catch (error) {
    console.error("❌ Error fetching user profiles:", error);
    res.status(500).json({
      error: "Failed to fetch user profiles",
      details: error instanceof Error ? error.message : error,
    });
  }
});


router.post("/", async (req, res) => {
  console.log(" Received POST /api/users request");

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = {
      pk: `USER#${username}`,
      sk: `PROFILE#${username}`,
      username,
      email,
      password,
    };

    const command = new PutCommand({
      TableName: "chappy",
      Item: newUser,
    });

    await db.send(command);
    console.log("✅ New user created:", newUser);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
