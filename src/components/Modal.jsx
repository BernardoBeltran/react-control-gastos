import { useState, useEffect } from "react";
import IconoCerrarModal from "../assets/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [fecha, setFecha] = useState("");
    const [id, setId] = useState("");

    // Se ejecuta una vez cuando el componente este listo y
    // comprueba que gastoEditar sea mayor que cero
    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha);
            setId(gastoEditar.id);
        }
    }, []);

    // Controlar Modal y Animación de cierre del Formulario
    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    // Manejar el Formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios");

            return;
        }

        setMensaje("");

        // Ejecuta la función y envía un objeto como argumento,
        // con las variables de estado del formulario
        guardarGasto({ nombre, cantidad, categoria, fecha, id });
    };

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={IconoCerrarModal}
                    alt="Icono cerrar modal"
                    onClick={ocultarModal}
                    title="Cerrar Ventana"
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
                <legend>
                    {gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}
                </legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre del Gasto. Eje: Empanadas"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Costo</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Cantidad Gastada. Eje: $5.000"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>

                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={
                        gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"
                    }
                />
            </form>
        </div>
    );
};

export default Modal;
