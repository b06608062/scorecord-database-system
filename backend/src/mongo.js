import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

// export default ()=>{
//   dotenv.config();
//   mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => console.log("mongo db connection created"))
//   .catch((error) => console.log(error));
// }

function connectMongo() {
  dotenv.config();
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongo connected!');
  });
}

export default () => {connectMongo()};