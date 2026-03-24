const express = require("express");
const app = express();
// we are making the server to interact with frontend
app.use(express.static("public"));//server knows that all files are in public

// start server
app.listen(3000, () => {
    console.log("server started at http://localhost:3000");
});