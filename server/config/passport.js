const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { User } = require("../services/connectDB").db;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:5000/auth/google/callback`,
            scope: ['profile', 'email']

        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("passport-> ", {accessToken, refreshToken, profile, done})
                let user = await User.findOne(
                    {
                     where: {googleId: profile.id }
                    });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                    });
                }
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

// Serialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);

    console.log("user -> ", user);
    done(null, user);
});