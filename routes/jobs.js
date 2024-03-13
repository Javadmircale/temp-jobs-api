const router = require("express").Router();
const {
  getJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobs");

router.route("/").get(getJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);
module.exports = router;
