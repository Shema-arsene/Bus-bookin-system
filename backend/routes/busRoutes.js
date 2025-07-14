const express = require("express")
const {
  getBuses,
  createBus,
  getBusById,
  updateBus,
  deleteBus,
} = require("../controller/busController")

const router = express.Router()

router.route("/").get(getBuses).post(createBus)
router.route("/:id").get(getBusById).put(updateBus).delete(deleteBus)

module.exports = router
