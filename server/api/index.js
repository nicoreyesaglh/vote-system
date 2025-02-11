const router = require("express").Router();
const voteController = require("../controllers/voteController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/health", (req, res) => {
  res.send("API running!");
});
//auth
router.post("/login", authController.login);
router.post("/modifyPassword", authMiddleware, authController.modifyPassword);
//votes
router.post("/vote", voteController.newVote);
router.post("/createVoter", authMiddleware, voteController.createVoter);
router.get("/getVotes", authMiddleware, voteController.getVotes);
router.get("/getCandidates", voteController.getCandidates);
router.post("/getVoteData", authMiddleware, voteController.getVoteData);
router.get("/getTopVotedCandidates", authMiddleware, voteController.getTopVotedCandidates);

module.exports = router;
