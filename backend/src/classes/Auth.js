const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserManager = require('./UserManager');

class Auth {
    static async login(username, password) {
        if(!UserManager.usernameExists(username)) {
            // if user does not exist
            return {
                status: false, 
                reason: "This user does not exist!"
            };
        }

        const user = await UserManager.getFromUsername(username);

        if(!user) {
            return {
                status: false, 
                reason: "User does not exist!"
            };
        }

        // compare passwords (submited and from db), if they don't match, return
        if(!await user.comparePasswords(password)) {
            return {
                status: false, 
                reason: "Wrong password!"
            };
        }
        
        const tokenData = {                     // the data that is stored on the user end
            id: user.getId()
        };   
        const signedToken = jwt.sign(           // sign token
            tokenData, 
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.LOGIN_EXPIRES_IN || '1d',
            }
        ); 

        return {
            status: true, 
            token: signedToken, 
            user: user
        };
    }

    static async register(username, password) {
        // if username already exists, return
        if(await UserManager.usernameExists(username)){
            return {
                status: false, 
                reason: "This username is already taken! Try another one."
            };
        }

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // hash password
    
        // create new user (write it to database)
        const newUser = await UserManager.create(
            username, 
            hashedPassword
        );

        return {
            status: true, 
            user: newUser
        };
    }
}

module.exports = Auth;
