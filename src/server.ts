import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function main() {
  await mongoose.connect(config.database_url as string);
  app.listen(config.port, () => {
    console.log(`🚀🚀Server running at port ${config.port}`);
  });
}
main();