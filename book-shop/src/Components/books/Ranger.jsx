import '../../App.css';
import {  useState } from 'react';

export function Ranger({minMax, filter, setFilter}) {


    return (
        <div>
            <div>
                <label>Book price: {filter}</label>
            </div>
            <input type="range" min={Math.floor(minMax[0])} max={Math.ceil(minMax[1])} value={filter} onChange={e => setFilter(e.target.value)}/>
        </div>
    )
}