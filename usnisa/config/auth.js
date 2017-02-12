// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1658397387812036', // your App ID
        'clientSecret'    : 'c63bfada6ec8ee60ad0b1c7486a5b350', // your App Secret
        'callbackURL'     : 'http://ec2-52-66-117-1.ap-south-1.compute.amazonaws.com:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '975964624949-pm0eu7nskrpuubc7ihc8vhki4dtk8vjg.apps.googleusercontent.com',
        'clientSecret'     : '4hx-31P7OYhU1rYv3HiWkb8A',
        'callbackURL'      : 'http://ec2-52-66-117-1.ap-south-1.compute.amazonaws.com:8080/auth/google/callback'
    }

};
