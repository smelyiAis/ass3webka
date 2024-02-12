const express = require("express");
const axios = require("axios");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.render("login");
});


app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    try {
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            return res.send('User already exists. Please choose a different username.');
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword;

            await collection.insertMany(data);
            console.log("User registered successfully:", data);
            res.redirect("/"); // Redirect to login page
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user. Please try again later.");
    }
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("Wrong password");
        } else {
            res.render("home");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in. Please try again later.");
    }
});

// Handle weather request
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = "7fce772c231a77027679eb0abc439af8"; 
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weather = response.data;

        // Render weather data to the client
        res.render("index", { weather, error: null });
    } catch (error) {
        console.error("Error fetching weather:", error);
        res.render("index", { weather: null, error: "Error fetching weather. Please try again later." });
    }
});

// Handle news request
app.get("/news", async (req, res) => {
    const apiKey = "888e1bae53f6445c8c7a762df5510430";
    const apiUrl = `https://newsapi.org/v2/everything?q=microsoft&from=2021-08-17&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const articles = response.data.articles;
        
        // Render news data to the client
        res.render("news", { articles });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).send("Error fetching news. Please try again later.");
    }
});

// Handle numbers request
app.get("/numbers", async (req, res) => {
    const number = req.query.number;
    const apiUrl = `http://numbersapi.com/${number}`;

    try {
        const response = await axios.get(apiUrl);
        const fact = response.data;

        // Render fact data to the client
        res.render("index", { fact, error: null });
    } catch (error) {
        console.error("Error fetching number fact:", error);
        res.render("index", { fact: null, error: "Error fetching number fact. Please try again later." });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
