
let auth = {};

const CLIENT_ID = "549291455346-9khcqe4djdk2orsiv2fsh9jh71soh4r8.apps.googleusercontent.com";    // Web Application
// const CLIENT_ID = "549291455346-51gec1qe0nh30v4b3infh4t7t1hcl252.apps.googleusercontent.com"; // Native
const SCOPE = "https://www.googleapis.com/auth/gmail.compose"

gapi.load('client:auth2', init);

function init(authListener) {
    gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPE
    }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(authListener);
        authListener(gapi.auth2.getAuthInstance().isSignedIn.get());
        console.log('Initialized G API...');
    })
}

auth.isSigned = function () {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
}

auth.getToken = function () {
    return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
}

// Pass it to login button
auth.signInHandler = function (event) {
    gapi.auth2.getAuthInstance().signIn();
}

// Pass it to logout button
auth.signOutHandler = function (event) {
    gapi.auth2.getAuthInstance().signOut();
}

export default auth
