const router = require("express").Router();
const cloudinary = require("../utils/cloudary");
const upload = require("../utils/multer");
const Image = require("../model/imageModel");
const moment = require("moment")
const signupUser = require("../model/user")
const schemaValidation = require("../middleware/schemaValidation");
const httpStatus = require("http-status");

router.post("/image", upload.single("image"), async (req, res) => {
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        const date = moment(new Date()).format("YYYY-MM-DD")
        // Create new user
        let image = new Image({
            imageName: req.body.imageName,
            description: req.body.description,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
            date: date
        });

        // save user details in mongodb
        await image.save();
        res.status(200)
            .send({
                image
            });
    } catch (err) {
        console.log(err);
    }
});

router.get("/getImage", async (req, res) => {
    try {
        const findImage = await Image.find();
        for (let i = 0; i < findImage.length; i++) {
            // console.log(findImage[i].views)
            findImage[i].views++

        }
        return res.status(200).send({ findImage })
    } catch (error) {
        return res.status(401).send({ error })
    }
})

router.post("/signup", schemaValidation.signUp, async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const createUser = await signupUser.create(data)
    res.status(httpStatus.CREATED).send({ data: createUser })
})

router.post("/login", schemaValidation.login, async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    const loginUser = await signupUser.findOne(data)
    res.status(httpStatus.OK).send({ data: loginUser })
})

module.exports = router;