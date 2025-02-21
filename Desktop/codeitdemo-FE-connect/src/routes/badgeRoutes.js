const express = require("express");
const router = express.Router();
const { checkAndAwardBadge } = require("../services/badgeService");

router.get("/groups/:groupId/badges", async (req, res) => {
  const { groupId } = req.params;
  const badges = await checkAndAwardBadge(groupId);
  res.status(200).json({ badges });
});

module.exports = router;