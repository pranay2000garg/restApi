const mongoose = require("mongoose");
const MONGO_KEY = 'mongodb+srv://pranaygarg:pranaygarg@cluster.vzsbd.mongodb.net/todo?retryWrites=true&w=majority'
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


