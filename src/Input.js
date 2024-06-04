import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ButtonFav } from './ButtonFav';
import { ButtonLike } from './ButtonLike';

export function Input() {
    //Declaramos las variables de estado
    const [mensaje, setMensaje] = useState(''); // String de búsqueda
    const [facts, setFacts] = useState([]); // Para almacenar los resultados de la búsqueda
    const [error, setError] = useState(''); // Para manejar los errores
    const [favorites, setFavorites] = useState([]);//almacenador de facts favoritos
    const [showFavorites, setShowFavorites] = useState(false); // Para alternar la visualización entre facts de búsqueda y favoritos

    // useEffect para realizar la búsqueda automáticamente cada vez que la variable cambie (input)

    useEffect(() => {
        const fetchFacts = async () => {
            setError(''); // Limpiamos las variables de estado de valores previos
            setFacts([]); // Limpiamos los facts previos

            if (!mensaje) {  // Si no hay nada escrito, el programa pide texto
                setError('Por favor, introduzca su búsqueda.');
                return;
            }

            try {
                console.log('Realizando búsqueda para:', mensaje); // Log para verificar la búsqueda
                const response = await axios.get(`https://api.chucknorris.io/jokes/search`, {
                    params: {
                        query: mensaje
                    }
                });

                const data = response.data; // Guardamos la respuesta del servidor en un json para trabajar los datos
                console.log('Datos recibidos:', data); // Log para verificar los datos recibidos

                if (data.total === 0) {
                    setFacts([]);
                    setError('No existen facts coincidentes con su búsqueda.');
                    return;
                }

                setFacts(data.result);
            } catch (error) {
                setError(`Ha ocurrido un error: ${error.message}`);
            }
        };

        fetchFacts(); // Llamamos a la función para realizar la búsqueda

    }, [mensaje]); // Dependencia: cada cambio de mensaje, realiza la búsqueda

    const addToFavorites = (fact) => {
        setFavorites(prevFavorites => {
            // Evitamos duplicados en favoritos
            if (prevFavorites.find(fav => fav.id === fact.id)) {
                return prevFavorites;
            }  
            return [...prevFavorites, fact]; //aqui se crea una nueva lista de fav que contiene los elementos previos mas el que estamos agregando
        });
    };

    return (
        <div>
            <h1>Input</h1>
            <input onChange={(e) => setMensaje(e.target.value)} />
            <ButtonFav text="Ver favoritos" onClick={() => setShowFavorites(!showFavorites)} />
            {error && <p className="error">{error}</p>}
            {!showFavorites && (
                <div id="results">
                    {facts.map(fact => (
                        <div key={fact.id} className="fact">
                            <p>{fact.value}</p>
                            <p>Created at: {fact.created_at}</p>
                            <p className="categories">Categories: {fact.categories.length > 0 ? fact.categories.join(', ') : 'None'}</p>
                            <ButtonLike text="Me gusta" onClick={() => addToFavorites(fact)} />
                        </div>
                    ))}
                </div>
            )}
            {showFavorites && (
                <div id="favorites">
                    <h2>Favoritos</h2>
                    {favorites.map(fact => (
                        <div key={fact.id} className="fact">
                            <p>{fact.value}</p>
                            <p>Created at: {fact.created_at}</p>
                            <p>{fact.updated_at}</p>
                            <p className="categories">Categories: {fact.categories.length > 0 ? fact.categories.join(', ') : 'None'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
