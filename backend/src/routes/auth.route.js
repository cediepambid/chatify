import express from "express";

const app = express();

app.get("/signup", (req, res) => {
    res.send("Signup endpoint");
})

app.get("/login", (req, res) => {
    res.send("Login endpoint");
})

app.get("/logout", (req, res) => {
    res.send("Logout endpoint");
})

export default app;