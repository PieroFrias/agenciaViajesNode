import { Testimonial } from '../models/Testimonial.js'

const guardarTestimonial = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === '') { errores.push({ mensaje: 'El nombre está vacío' }); }
    if (correo.trim() === '') { errores.push({ mensaje: 'El correo está vacío' }); }
    if (mensaje.trim() === '') { errores.push({ mensaje: 'El mensaje está vacío' }); }

    if (errores.length > 0) {
        const testimoniales = await Testimonial.findAll();
        
        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimonilaes',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }
    else {
        // Alamacenarlo en la BD
        try {
            await Testimonial.create({
                nombre, 
                correo, 
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
};

export {
    guardarTestimonial
}