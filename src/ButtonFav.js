import React from 'react';

export function ButtonFav({ text = 'Ver favoritos', onClick }) {
    return (
        <button onClick={onClick}>
            ver favoritos
        </button>
    );
}
