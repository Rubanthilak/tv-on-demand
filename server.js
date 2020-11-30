const express = require("express");
const path = require("path");
const app = express();
const port = 5500;

app.use("/src",express.static(path.resolve(__dirname,"src")))
app.get("/",(req,res)=>{
    res.sendFile(path.resolve("index.html"));
});

app.listen(port, () => {
    console.log("\nCtrl + left-click on the link below :");
    console.log(
        '\x1b[32m%s\x1b[0m',
        "http://localhost:"+port
    );
    console.log("\nServer running...");
}); 