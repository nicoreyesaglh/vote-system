const router = require("express").Router();
const voteController = require("../controllers/voteController");
const authController = require("../controllers/authController");

router.get("/health", (req, res) => {
    res.send("Hello World!");
});

router.post('/login', authController.login);
router.post('/vote', voteController.newVote);
router.post('/createVoter', voteController.newVote);
router.get('/getVotes', (req, res) => { });
router.get('/getCandidates', (req, res) => { });
router.get('/logout', (req, res) => { });
router.get('/getVoterData', (req, res) => { });

module.exports = router;
    
