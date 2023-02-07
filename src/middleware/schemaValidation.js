const signupUser = require("../model/user");
const httpStatus = require("http-status");
const signUp = async (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    if (!data.name) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "enter your name" })
    }
    if (!data.email) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "enter your email" })
    }
    if (!data.password) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "enter your password" })
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "enter correct email" })
    }
    next();
}

const login = async (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    if (!data.email) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "enter correct email" })
    }
    if (!data.password) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "enter correct password" })
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "enter correct email" })
    }
    next();
}

module.exports = {
    signUp,
    login
}