import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatearPresupuesto } from "../Helpers";

const ControlPresupuesto = ({
    presupuesto,
    setPresupuesto,
    gastos,
    setGastos,
    setIsValidPresupuesto,
}) => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    /**
     * Calcular los gastos, el presupuesto y el disponible,
     * durante el prime render y cada que gastos cambie.
     */
    useEffect(() => {
        const totalGastado = gastos.reduce(
            (total, gasto) => gasto.cantidad + total,
            0
        );

        const totalDisponible = presupuesto - totalGastado;

        // Calcular porcentaje gastado
        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) *
            100
        ).toFixed(2);

        setGastado(totalGastado);
        setDisponible(totalDisponible);

        // Luego de cierto tiempo actualiza Porcentaje para actualizar la gráfica
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1300);
    }, [gastos]);

    // Resetear aplicación
    const handleReset = () => {
        const confirmar = confirm("¿Desear reiniciar presupuesto y gastos?");
        if (confirmar) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
                        trailColor: "#e9e9e9",
                        textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                ></CircularProgressbar>
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleReset}
                >
                    Resetear Aplicación
                </button>
                <p>
                    <span>Presupuesto: </span>
                    {formatearPresupuesto(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span>
                    {formatearPresupuesto(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>
                    {formatearPresupuesto(gastado)}
                </p>
            </div>
        </div>
    );
};

export default ControlPresupuesto;
