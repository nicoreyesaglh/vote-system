const router = require("express").Router();
const appController = require("../controllers");

router.get("/health", (req, res) => {
    res.send("Hello World!");
});

router.post('/login', (req, res) =>  {});
router.post('/register', (req, res) => { });
router.get('/candidates', (req, res) => { });
router.post('/vote', appController.newVote);
router.get('/votes', (req, res) => { });
router.get('/logout', (req, res) => { });
router.put('/updateVote', (req, res) => { });
router.get('/voterData', (req, res) => { });

module.exports = router;
    
