import mongoose from "mongoose";

const testimonialsShema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		porcent: {
			type: Number,
			required: true,
			trim: true,
		},
		status: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Testimonials = mongoose.model("Testimonials", testimonialsShema);
export default Testimonials;
