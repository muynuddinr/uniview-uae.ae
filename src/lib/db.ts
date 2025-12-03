import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null; uri?: string } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

type MongooseConnection = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
  uri?: string;
};

let cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
  uri: MONGODB_URI,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<mongoose.Connection> {
  // If the configured URI changed since the last connection, reset cache
  if (cached.uri && cached.uri !== MONGODB_URI) {
    cached.conn = null;
    cached.promise = null;
    cached.uri = MONGODB_URI;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}export default connectDB;