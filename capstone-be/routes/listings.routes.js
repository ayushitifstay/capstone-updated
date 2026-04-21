const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/listings.controller");
console.log("CTRL:", ctrl);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", auth, ctrl.create);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;