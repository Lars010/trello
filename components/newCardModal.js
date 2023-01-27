import { useState } from "react"
import List from "./list";


function NewCardModal({setIsModalOpen, handleCreateCard}) {
    const [title, setTitle] = useState("");

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleCreateClick = () => {
        handleCreateCard(title);
        setIsModalOpen(false);
    };

    // const handleAddClick = () => {
        
    //     console.log("Title:", title);
    // }

    const handleCerrarClick = () => setIsModalOpen(false);

    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
        <div className="relative p-4 bg-white rounded-md">
            <div className="flex flex-col mb-4">
                <label className="mb-2 text-lg font-medium text-lime-600" htmlFor="title">Título</label>
                <input className="p-2 text-gray-800 bg-gray-200 rounded-md border-lime-600" type="text" id="title" value={title} onChange={handleTitleChange} />
            </div>
            <div className="flex justify-end">
                <button className="px-4 py-2 mr-2 text-white rounded-md bg-lime-600" onClick={handleCreateClick}>Agregar</button>
                <button className="px-4 py-2 bg-gray-300 rounded-md text-lime-600" onClick={handleCerrarClick}>Cerrar</button>
            </div>
        </div>
    </div>
    )
}

export default NewCardModal


// Agregar el componente Card a newCardModal para que al darle click a agregar 
// en el modal se agrege nueva carta