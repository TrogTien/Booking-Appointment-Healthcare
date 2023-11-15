const { User } = require('../models/User.model');
const { UserToken } = require('../models/UserToken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



class AuthController {
    

    // [POST] /api/auth/register
    async registerUser(req, res) {
        try {
            const { username, password, email } = req.body

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await new User({
                username: username,
                password: hashedPassword,
                email: email,
            })

            const user = await newUser.save();
            res.status(200).json(user)

        } catch(err) {
            res.status(500).json(err)
        }
    }

    // [POST] /api/auth/login
    loginUser = async (req, res) => {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username: username});

            if (!user) {
                return res.status(404).json("Incorrect username")
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(404).json("Incorrect password")
            }
            

            if (user && isValidPassword) {
                const accessToken = this.generateToken(user);
                const refreshToken = this.generateRefreshToken(user);

                const userToken = await UserToken.findOne({ _userId: user._id })
                if (userToken) {
                    await UserToken.deleteOne({ _userId: user._id })

                }
                await new UserToken({ _userId: user._id, refreshToken: refreshToken }).save();

                res.header('x-refresh-token', refreshToken)
                   .header('x-access-token', accessToken)
                   .send("Login Success");

            }
        } catch(err) {
            res.status(500).json(err);
        }
    }

    // [POST] /api/auth/accessToken

    requestNewAccessToken = (req, res) => {

        const payload = req.payload;
        const newAccessToken = this.generateToken(payload);

        res.header('x-access-token', newAccessToken).send({ newAccessToken });
    }

    // Function Helper

    generateToken(user) {
        return jwt.sign(
            {
                _id: user._id,
                role: user.role,
            },
            process.env.JWT_ACCESS_TOKEN_KEY,
            {
                expiresIn: "20m"
            }
        )
    }

    generateRefreshToken(user) {
        return jwt.sign(
            {
                _id: user._id,
                role: user.role
            },
            process.env.JWT_REFRESH_TOKEN_KEY,
            {
                expiresIn: "7d"
            }
        )

    }
   
}

module.exports = new AuthController();