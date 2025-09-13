const testcontroller = (req, res) => {
    try {
        res.status(200).send("<h1>test usertest Api </h1>");
    } catch (error) {
        console.log("error in test API: ", error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { testcontroller };
