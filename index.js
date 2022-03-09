const mongoose = require("mongoose");
//has to be hidden
const MONGO_KEY = 'mongodb+srv://<username>:<password>@cluster.vzsbd.mongodb.net/<table_name>?retryWrites=true&w=majority'
const app = require('./routes')



mongoose.connect(MONGO_KEY,
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.listen(8000, () => {
    console.log("Server is running at port 8000");
  });


