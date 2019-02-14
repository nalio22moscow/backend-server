/**
 * Bootstrap
 */
const   express             = require("express"),
        flash               = require("connect-flash"),
        bodyParser          = require("body-parser"),
        mongoose            = require("mongoose"),
        passport            = require("passport"),
        localStrategy       = require("passport-local"),
        expressSession      = require("express-session"),
        methodOverride      = require("method-override"),
        app                 = express();

/**
 * Models
 */
const   Campground          = require("../models/campground"),
        Comment             = require("../models/comment"),
        User                = require("../models/user");

/**
 * Routes
 */
const   commentRoutes       = require("../routes/comments"),
        userRoutes          = require("../routes/users"),
        postRoutes          = require("../routes/posts"),
        profileRoutes       = require("../routes/profile"),
        indexRoutes         = require("../routes")

/**
 * Database Configurations
 */
const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/nodeCms";
mongoose.connect(databaseUrl, {useNewUrlParser: true})
    .then(() => {
        console.log("Database Connected!!");
    })
    .catch((err) => {
        console.log("Database connection error." + err.message);
    })

/**
 * Boostrap setup
 */
app.use("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

/**
 * Passport Configurations
 */
app.use(expressSession({
    secret: "",
    resave: false,
    saveUninitialized: false
}));

/**
 * Middleware functions to call on every route which displays friendly
 * user messages
 * @since 1.0.0
 */
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.error = req.flash("success");
});


/**
 * Passport Configurations
 */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**
 * Middleware functions to call on every route which displays friendly
 * user messages
 * @since 1.0.0
 */
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
});

/**
 * Express Routes
 */
app.use("/", indexRoutes);
// Routes which relates to post comment based on the ID of the post the comments attached to
app.use("/posts/:id/comments", commentRoutes);
// routes which relates to blog post
app.use("/posts", postRoutes);
// routes which relates to user profile 
app.use("/profile", profileRoutes);
// routes which relates to a user
app.user("/user", userRoutes);

/**
 * Listen for server
 */
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Application started!");
});