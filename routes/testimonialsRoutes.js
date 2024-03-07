import express from "express";
// import checkAuth from "../middlewares/checkAuth";
import {
	hideTestimonials,
	createTestimonials,
	allTestimonials,
	deleteTestimonials,
	onlyTestimonialsShow,
} from "../controllers/testimonialsController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();
router.post("/create-testimonials", createTestimonials);
router.put("/hide-testimonials/:id", checkAuth, hideTestimonials);
router.get("/all-testimonials", allTestimonials);
router.get("/only-show-testiomonials", onlyTestimonialsShow);
router.delete("/delete-testimonials/:id", checkAuth, deleteTestimonials);

export default router;
