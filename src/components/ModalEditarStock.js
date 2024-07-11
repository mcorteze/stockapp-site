import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import './ModalEditarStock.css';

const ModalEditarStock = ({ articulo, actualizarStock, eliminarArticulo, onHide }) => {
    const [nuevoStock, setNuevoStock] = useState(articulo.stock);

    useEffect(() => {
        setNuevoStock(articulo.stock);
    }, [articulo]);

    const handleSubmit = () => {
        actualizarStock(articulo.id, nuevoStock);
        onHide();
    };

    const confirmarEliminacion = () => {
        if (window.confirm(`¿Seguro que deseas eliminar el artículo ${articulo.nombre}?`)) {
            eliminarArticulo(articulo.id);
            onHide();
        }
    };

    return (
        <Dialog header={`Editar Stock de ${articulo.nombre}`} visible={true} style={{ width: '50vw' }} onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="stock">Stock</label>
                    <InputNumber id="stock" value={nuevoStock} onValueChange={(e) => setNuevoStock(e.value)} />
                </div>
                <Button label="Actualizar" icon="pi pi-check" className='btn-actualizar' onClick={handleSubmit} />
                <Button label="Eliminar Artículo" icon="pi pi-trash" className="btn-eliminar p-button-danger" style={{ backgroundColor: 'red'}} onClick={confirmarEliminacion} />
            </div>
        </Dialog>
    );
};

export default ModalEditarStock;
