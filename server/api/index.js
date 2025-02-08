const router = require("express").Router();
const voteController = require("../controllers/voteController");
const authController = require("../controllers/authController");

router.get('/health', (req, res) => {
    res.send("App running!");
});

router.post('/login', authController.login);
router.post('/modifyPassword', authController.modifyPassword);

router.post('/vote', voteController.newVote);
router.post('/createVoter', voteController.createVoter);
router.get('/getVotes', voteController.getVotes);
router.get('/getCandidates', voteController.getCandidates);
router.post('/getVoteData', voteController.getVoteData);
router.get('/getTopVotedCandidates', voteController.getTopVotedCandidates);

module.exports = router;
    
