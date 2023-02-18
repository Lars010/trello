import { useState } from "react";
import Image from "next/image";

function List({ title, children, handleDrop, id, openModal, modalBoton, signoPlus }) {

  function handleDragOver(event) {
    event.preventDefault();
  }



  return (
    <div
      data-id={id}
      className="relative flex-1"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 flex flex-col flex-1 gap-4 p-4 text-gray-900 rounded bg-slate-300">
        <h2 className="font-bold">{title}</h2>
        <div className="flex flex-col gap-4 overflow-auto">{children}</div>
        <div draggable className="flex flex-col gap-4 overflow-auto">
          
        </div>
        <div className="flex items-center">
          <span>{signoPlus}</span>
          <button onClick={openModal}>{modalBoton}</button>
        </div>
      </div>
      
    </div>
  );
}

export default List;

//importar import Image from "next/image" y luego agregar la imagen del + para agregar una card nuevo.
