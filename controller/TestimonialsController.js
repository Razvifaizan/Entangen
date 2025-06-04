const Testimonial = require("../models/Testimonial");

exports.getTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.find();
      res.json(testimonials);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  exports.addTestimonial = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
  
    const { name, rating, review } = req.body;
    const image = req.file;
  
    if (!image) {
      console.log("No image file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }
  
    const newTestimonial = new Testimonial({
      name,
      image: image.path || image.secure_url,
      rating,
      review,
    });
  
    try {
      await newTestimonial.save();
      console.log("Testimonial saved:", newTestimonial);
      res.status(201).json(newTestimonial);
    } catch (err) {
      console.error("Error saving testimonial:", err);
      res.status(500).json({ error: err.message || err });
    }
  };
  
  

  
  exports.updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { name, image, rating, review } = req.body;
  
    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        id,
        { name, image, rating, review },
        { new: true }
      );
  
      if (!updatedTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
  
      res.json(updatedTestimonial);
    } catch (err) {
      res.status(500).json({ error: err.message});
    }
  };

  
  exports.deleteTestimonial = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
  
      if (!deletedTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
  
      res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  