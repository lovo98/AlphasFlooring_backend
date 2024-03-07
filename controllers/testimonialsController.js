import Testimonials from "../models/Testimonials.js";

const hideTestimonials = async (req, res) => {
	const { id } = req.params;
	const testimonials = await Testimonials.findById(id);

	if (!testimonials) {
		const error = new Error("No testimony found");
		return res.status(404).json({ mensaje: error.message });
	}

	testimonials.status = req.body.status;

	try {
		await testimonials.save();
		res.json({ mesaje: "Testimonial successfully updated" });
	} catch (error) {
		return res.status(400).json({ mensaje: error });
	}
};

const deleteTestimonials = async (req, res) => {
	const { id } = req.params;
	const testimonials = await Testimonials.findById(id);

	if (!testimonials) {
		const error = new Error("No testimony found");
		return res.status(404).json({ mensaje: error.message });
	}

	try {
		await testimonials.deleteOne();
		return res.json({ mensaje: "Testimonial successfully deleted" });
	} catch (error) {
		return res.status(400).json({ mensaje: error });
	}
};

const createTestimonials = async (req, res) => {
	try {
		const testimonials = new Testimonials(req.body);
		await testimonials.save();
		res.json({
			mensaje:
				"Successfully created testimonial, your opinion will be shown in a few minutes",
		});
	} catch (error) {
		res.json({ mensaje: `Error: ${error}` });
	}
};

const allTestimonials = async (req, res) => {
	try {
		const page = req.query.page ? parseInt(req.query.page) : 1;
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;

		// Calcula cuántos documentos se deben saltar para la paginación
		const skip = (page - 1) * pageSize;

		// Realiza la consulta con paginación y filtrado por status true
		const testimonials = await Testimonials.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(pageSize);

		// Obtiene el total de testimonios con status true
		const totalTestimonials = await Testimonials.countDocuments();

		// Calcula el número total de páginas
		const totalPages = Math.ceil(totalTestimonials / pageSize);

		// Construye la respuesta para enviar al front-end
		const response = {
			pagination: {
				page,
				pageSize,
				totalItems: totalTestimonials,
				totalPages,
			},
			data: testimonials,
		};

		res.json(response);
	} catch (error) {
		res.status(500).json({ mensaje: `Error: ${error}` });
	}
};

const onlyTestimonialsShow = async (req, res) => {
	try {
		const page = req.query.page ? parseInt(req.query.page) : 1;
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;

		// Calcula cuántos documentos se deben saltar para la paginación
		const skip = (page - 1) * pageSize;

		// Realiza la consulta con paginación y filtrado por status true
		const testimonials = await Testimonials.find({ status: true })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(pageSize);

		// Obtiene el total de testimonios con status true
		const totalTestimonials = await Testimonials.countDocuments({
			status: true,
		});

		// Calcula el número total de páginas
		const totalPages = await Math.ceil(totalTestimonials / pageSize);

		// Construye la respuesta para enviar al front-end
		const response = {
			pagination: {
				page,
				pageSize,
				totalItems: totalTestimonials,
				totalPages,
			},
			data: testimonials,
		};

		res.json(response);
	} catch (error) {
		res.status(500).json({ mensaje: `Error: ${error}` });
	}
};

export {
	hideTestimonials,
	createTestimonials,
	allTestimonials,
	deleteTestimonials,
	onlyTestimonialsShow,
};
