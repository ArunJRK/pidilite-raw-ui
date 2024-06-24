import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (!MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable");
}

interface ConnectionCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

let cached: ConnectionCache = {
  conn: null,
  promise: null,
};

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      dbName: MONGODB_DB, // Specify the database name
    };

    cached.promise = connect(opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

async function connect(opts: mongoose.ConnectOptions): Promise<Connection> {
  const retryLimit = 3;

  async function tryConnect(retryCount: number = 0): Promise<Connection> {
    try {
      if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
      }

      await mongoose.connect(MONGODB_URI!, opts);
      console.log(`Connected successfully to MongoDB database: ${MONGODB_DB}`);
      return mongoose.connection;
    } catch (error) {
      console.error("MongoDB connection error:", error);

      if (retryCount < retryLimit) {
        console.log(`Retrying connection... (${retryCount + 1}/${retryLimit})`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        return tryConnect(retryCount + 1);
      } else {
        throw new Error("Failed to connect to MongoDB after multiple retries");
      }
    }
  }

  return tryConnect();
}

export async function closeConnection(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      cached.conn = null;
      cached.promise = null;
    } catch (err) {
      console.error("Error closing MongoDB connection:", err);
      throw err;
    }
  }
}

// Handling connection events
mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to DB: ${MONGODB_DB}`);
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Handling process events
process.on("SIGINT", async () => {
  await closeConnection();
  process.exit(0);
});
