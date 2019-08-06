const passport = require("passport");
var GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user-model");

// Passport takes that user id and stores it internally on 
// req.session.passport which is passport’s internal 
// mechanism to keep track of things.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// makes a request to our DB to find the full profile information 
// for the user and then calls done(null, user). This is where 
// the user profile is attached to the request handler at req.user.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    // This takes the profile info and attaches it on the request 
    // object so its available on your callback url as req.user.
    done(null, user);
  });
});

// Implementing the passport github strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: "XXXXXXXXXXX",
      clientSecret: "ca1c6edeXXXX35ce0893XXXXXe78967efXXXXXe",
      callbackURL: "/auth/github/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      // Callback method triggered upon signing in.
      User.findOne({ githubId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have this user
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            githubId: profile.id,
            username: profile.username,
            name: profile.displayName,
            image: profile._json.avatar_url
          })
            .save()
            .then(newUser => {
              done(null, newUser);
            });
        }
      });
    }
  )
);