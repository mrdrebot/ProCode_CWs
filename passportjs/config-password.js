const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const userDB = {
    id: 1234567,
    email: 'test@test.ua',
    password: '123',
};

passport.serializeUser(function (user, done) {
    console.log('serialize:', user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize:', id);
    const user = (userDB.id === id) ? userDB : false;
    done(null, user);
});

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd'
    },
    function (email, passwd, done) {
        if (email === userDB.email && passwd === userDB.password) {
            return done(null, userDB);
        } else {
            return done(null, false);
        }
    }
    )
);