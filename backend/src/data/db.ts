
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

console.log("🧩 AWS_ACCESS_KEY_ID =", process.env.AWS_ACCESS_KEY_ID);
console.log("🧩 AWS_SECRET_ACCESS_KEY =", process.env.AWS_SECRET_ACCESS_KEY);
console.log("🧩 AWS_REGION =", process.env.AWS_REGION);

let client;
try {
  client = new DynamoDBClient({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
  });
  console.log("✅ DynamoDBClient initialized successfully");
} catch (error) {
  console.error("❌ Error initializing DynamoDBClient:", error);
  throw error;
}

export const db = DynamoDBDocumentClient.from(client);