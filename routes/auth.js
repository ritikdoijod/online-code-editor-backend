const router = require("express").Router();
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);

		if (error)
			res.status(400).send({message: error.details[0].message});

		const user = await User.findOne({email: req.body.email});
		if (!user)
			return res.status(401).send({message: "Invalid email or password." });

		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if (result) {
				const token = user.generateAuthToken();
				res.status(200).send({userId: user.username, email: user.email, token: token, message: "Logged in successfully."})
			} else {
				res.status(401).send({message: "Invalid email or password."})
			}
		});
	} catch (error) {
		res.status(500).send({message: "Internal server error."})
	}
});

const validate = (data) => {
	const schema = joi.object({
		email: joi.string().email().required().label("Email"),
		password: joi.string().required().label("Password")
	});

	return schema.validate(data);
}

module.exports = router;