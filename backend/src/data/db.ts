
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";



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