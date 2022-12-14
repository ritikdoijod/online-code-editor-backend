const router = require("express").Router();
const axios = require("axios");

const URL =
    "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/";
const HEADERS = {
    "Content-Type": "application/json",
    "client-secret": process.env.HE_CLIENT_SECRET,
};
	

router.post("/", async (req, resp) => {
    axios
        .post(
            URL,
            {
                lang: "PYTHON",
                source: req.body.program,
                input: "",
                memory_limit: 243232,
                time_limit: 5,
                context: { id: 213121 },
                callback: "https://client.com/callback/",
            },
            {
                headers: HEADERS,
            }
        )
        .then((res) => {
            const he_id = res.data.he_id;
            axios
                .post(
                    `${URL + he_id}`,
                    {},
                    {
                        headers: HEADERS,
                    }
                )
                .then((res) => {
                    axios
                        .get(`${res.data.result.run_status.output}`)
                        .then((res) => {
                            resp.status(200).send({ data: res.data });
                        })
                        .catch((error) => {
                            resp.status(400).send(error);
							console.log(error)
                        });
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;
