import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { formatearFecha, formatearPresupuesto } from "../Helpers";

import IconoAhorro from "../assets/icono_ahorro.svg";
import IconoCasa from "../assets/icono_casa.svg";
import IconoComida from "../assets/icono_comida.svg";
import IconoGastos from "../assets/icono_gastos.svg";
import IconoOcio from "../assets/icono_ocio.svg";
import IconoSalud from "../assets/icono_salud.svg";
import IconoSuscripciones from "../assets/icono_suscripciones.svg";

// Diccionario/Objeto para asociar cada categoría con un ícono
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
};

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
    const { categoria, nombre, cantidad, id, fecha } = gasto;

    // Editar gasto / acción al deslizar a la derecha
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    );

    // Eliminar gasto / acción al deslizar a la izquierda
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(id)} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        {/* Muestra ícono dinamicamente según la categoría: */}
                        <img
                            src={diccionarioIconos[categoria]}
                            alt={categoria}
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p
                                className="nombre-gasto"
                                title="Arrastrar a la Derecha para Editar e Izquierda para Eliminar"
                            >
                                {nombre}
                            </p>
                            <p className="fecha-gasto">
                                Agregado el:{" "}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">
                        {formatearPresupuesto(cantidad)}
                    </p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

export default Gasto;
