const jwt = require('jsonwebtoken');
const { UserToken } = require('../models/UserToken.model');

class AuthMiddleware {
    authenticate = (req, res, next) => {
        const accessToken = req.headers['x-access-token'];
        
        if (accessToken) {

            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_KEY, (err, decode) => {
                if (err) {
                    res.status(401).json("Token is not valid!")
                } else {
                    req.user_id = decode._id;
                    req.role = decode.role;
                    next();
                }
            })

        } else {
            res.status(401).json("You are not authenticate")
        }
    }

    verifyRefreshToken = (req, res, next) => {
        const refreshToken = req.headers['x-refresh-token'];
        const userId = req.headers['user-id'];

        UserToken.findOne({ _userId: userId })
            .then(userToken => {
                if (!userToken) {
                    return Promise.reject({
                        error: 'User not found. Make sure that the refresh token and user id are correct'
                    })
                } 

                req.userId = userId;
                req.userToken = userToken;

                return new Promise((resolve, reject) => {

                    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY, (err, decode) => {
                        if (err) {
                            reject({
                                error: 'Refresh token has expired or invalid'
                            })
                        } else {
                            req.payload = decode;
                            resolve();
                        }
                    })
                })
                
            })
            .then(() => {
                next()
            })
            .catch(err => {
                res.status(401).send(err)
            })

    }

    isAdmin = (req, res, next) => {
        if (req.role === "admin") {
            next()
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    }
}

module.exports = new AuthMiddleware()