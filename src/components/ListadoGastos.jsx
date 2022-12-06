import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
    gastos,
    setGastoEditar,
    eliminarGasto,
    filtro,
    elementosFiltrados,
}) => {
    return (
        <div className="listado-gastos contenedor">
            {filtro ? (
                <>
                    <h2>
                        {elementosFiltrados.length
                            ? "Gastos"
                            : "No hay Gastos en esta Categoría"}
                    </h2>
                    {elementosFiltrados.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2>
                        {gastos.length
                            ? "Gastos"
                            : "No hay Gastos en esta Categoría"}
                    </h2>
                    {gastos.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default ListadoGastos;
