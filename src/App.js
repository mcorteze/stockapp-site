import React, { useState, useEffect } from 'react';
import ModalAgregar from './components/ModalAgregar';
import TablaArticulo from './components/TablaArticulo';
import ModalEditarStock from './components/ModalEditarStock';
import ModalEditarArticulo from './components/ModalEditarArticulo';
import { saveAs } from 'file-saver';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import articulosData from './data/articulos';

const App = () => {
    const [articulos, setArticulos] = useState(() => {
        const savedArticulos = localStorage.getItem('articulos');
        return savedArticulos ? JSON.parse(savedArticulos) : articulosData;
    });

    const [selectedArticulo, setSelectedArticulo] = useState(null);
    const [editingArticulo, setEditingArticulo] = useState(null);

    useEffect(() => {
        localStorage.setItem('articulos', JSON.stringify(articulos));
    }, [articulos]);

    const agregarArticulo = (nuevoArticulo) => {
        nuevoArticulo.id = articulos.length + 1;
        const nuevosArticulos = [...articulos, nuevoArticulo];
        setArticulos(nuevosArticulos);
    };

    const actualizarStock = (id, nuevoStock) => {
        const nuevosArticulos = articulos.map((articulo) =>
            articulo.id === id ? { ...articulo, stock: nuevoStock } : articulo
        );
        setArticulos(nuevosArticulos);
    };

    const actualizarArticulo = (articuloActualizado) => {
        const nuevosArticulos = articulos.map((articulo) =>
            articulo.id === articuloActualizado.id ? articuloActualizado : articulo
        );
        setArticulos(nuevosArticulos);
    };

    const eliminarArticulo = (id) => {
        const nuevosArticulos = articulos.filter((articulo) => articulo.id !== id);
        setArticulos(nuevosArticulos);
        localStorage.setItem('articulos', JSON.stringify(nuevosArticulos));
    };

    const descargarData = () => {
        const blob = new Blob([JSON.stringify(articulos, null, 2)], { type: 'application/json' });
        saveAs(blob, 'articulos.json');
    };

    return (
        <div id="canvas">
            <header id="header">
                Control de Stock
            </header>
            <section id="contenido">
                <ModalAgregar agregarArticulo={agregarArticulo} />
                <TablaArticulo
                    articulos={articulos}
                    setSelectedArticulo={setSelectedArticulo}
                    setEditingArticulo={setEditingArticulo}
                />
                {selectedArticulo && (
                    <ModalEditarStock
                        articulo={selectedArticulo}
                        actualizarStock={actualizarStock}
                        onHide={() => setSelectedArticulo(null)}
                    />
                )}
                {editingArticulo && (
                    <ModalEditarArticulo
                        articulo={editingArticulo}
                        actualizarArticulo={actualizarArticulo}
                        eliminarArticulo={eliminarArticulo}
                        onHide={() => setEditingArticulo(null)}
                    />
                )}
            </section>

            <footer id="footer">
                <div className="toolbar">
                    <button onClick={descargarData} className="p-button p-component p-button-success">
                        <span className="p-button-icon p-c pi pi-download"></span>
                        <span className="p-button-label p-c">Descargar Data</span>
                    </button>
                </div>
                <div style={{ backgroundColor: 'rgb(91, 6, 114)', color: 'rgb(226, 206, 246)', padding: '20px', textAlign: 'center' }}>
                    <p>Hecho por el chancho</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
