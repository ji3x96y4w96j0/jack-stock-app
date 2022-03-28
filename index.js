require('dotenv').config();
const app = require("./app.js");


app.listen(process.env.PORT || 3000, function() {
  console.log('This server set up at port 3000.');
});