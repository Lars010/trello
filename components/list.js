import { useState } from "react";
import Image from "next/image";
import NewCardModal from "./newCardModal";

function List({ title, children, handleDrop, id, openModal, modalBoton, signoPlus }) {
    function handleDragOver(event) {
        event.preventDefault();
    }

    const handleEditClick = (evt) => {

    }

    return (
        <div
            data-id={id}
            className="relative flex-1"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="absolute inset-0 flex flex-col flex-1 gap-4 p-4 text-gray-900 rounded bg-slate-300">
                <h2 className="font-bold">{title} <span>
                    <Image src='/edit.svg' width={20} height={20} alt='edit' onClick={handleEditClick} />
                </span></h2>
                <div className="flex flex-col gap-4 overflow-auto">{children}</div>
                <div draggable className="flex flex-col gap-4 overflow-auto">

                </div>
                {signoPlus && <div className="flex items-center">
                    <span>{signoPlus}</span>
                    <button onClick={openModal}>{modalBoton}</button>
                </div>}
            </div>
        </div>
    );
}

export default List;

//importar import Image from "next/image" y luego agregar la imagen del + para agregar una card nuevo.
