import express from "express";

const app = express();

const main = () => {
    app.listen(3000, () => console.log("Server is listening on port 3000"));
}

main();
