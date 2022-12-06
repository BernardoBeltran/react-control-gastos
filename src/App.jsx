import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import IconoNuevoGasto from "./assets/nuevo-gasto.svg";
import Modal from "./components/Modal";
import { generarID } from "./Helpers";
import Filtros from "./components/Filtros";

function App() {
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem("presupuesto")) ?? 0
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [gastos, setGastos] = useState(
        localStorage.getItem("gastos")
            ? JSON.parse(localStorage.getItem("gastos"))
            : []
    );
    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro, setFiltro] = useState("");
    const [elementosFiltrados, setElementosFiltrados] = useState([]);

    // Abrir Modal para editar un Gasto
    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar]);

    // Definir en LS presupuesto, si presupuesto no existe establece 0
    useEffect(() => {
        localStorage.setItem("presupuesto", presupuesto ?? 0);
    }, [presupuesto]);

    // Obtener presupuesto desde LS y convertirlo a número
    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);

    // Definir en LS gastos, si gastos no existe establece []
    useEffect(() => {
        localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
    }, [gastos]);

    // Filtrar los gastos según la categoría seleccionada
    useEffect(() => {
        if (filtro) {
            const filtroAplicado = gastos.filter(
                (gasto) => gasto.categoria === filtro
            );

            setElementosFiltrados(filtroAplicado);
        }
    }, [filtro]);

    // Controlar Modal y Animación de apertura del Formulario
    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({}); // Restablece gastoEditar como vacío
        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    // Actualizar un gasto o agregar uno nuevo, según la condición
    const guardarGasto = (gasto) => {
        if (gasto.id) {
            // Actualizar
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            );

            setGastos(gastosActualizados);
            setGastoEditar({});
        } else {
            // Nuevo gasto
            // Antes de guardar el objeto, se añade un ID único y una fecha al objeto
            gasto.id = generarID();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    // Eliminar un gasto
    const eliminarGasto = (id) => {
        const gastosFiltrados = gastos.filter((gasto) => gasto.id !== id);
        setGastos(gastosFiltrados);
    };

    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                gastos={gastos}
                setGastos={setGastos}
            />
            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            elementosFiltrados={elementosFiltrados}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Icono nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
}

export default App;
