require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const router = require("./routes");
const verifyJwt = require("./middleware/verifyJwt");
const errorHandler = require("./middleware/errorHandler");

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//allows urlencoded or it is like a body parser
app.use(express.urlencoded({ extended: true }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//routes
app.use("/register", router.registerRoute);
app.use("/sign-in", router.signinRoute);
app.use("/refresh", router.refreshRoute);
app.use("/log-out", router.logoutRoute);

app.use(verifyJwt);
app.use("/people", router.peopleRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`SERVER STARTED AT ${process.env.PORT}`)
)