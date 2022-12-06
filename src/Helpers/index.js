// Generar un ID aleatorio
export const generarID = () => {
    const id = crypto.randomUUID();

    return id;
};

// Formatear una fecha
export const formatearFecha = (fecha) => {
    const fechaNueva = new Date();
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    };
    return fechaNueva.toLocaleDateString("es-CO", opciones);
};

// Formatear Modeda
export const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    });
};
