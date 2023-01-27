import { useState } from "react";
import Image from "next/image";
import NewCardModal from "./newCardModal";
import { v4 as uuidv4 } from "uuid";
import Card from "./card";

function List({ title, children, handleDrop, id, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const handleCreateCard = (title) => {
    const newCard = {
      id: uuidv4(),
      title: title,
      user: user,
    };
    setCards([...cards, newCard]);
    setIsModalOpen(false);
  };

  function handleDragOver(event) {
    event.preventDefault();
  }


  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };



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
        <div className="flex flex-col gap-4 overflow-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              id={card.id}
              user={card.avatar}
              // draggable onDragStart={() => setDragged(card.id)}
            />
          ))}
        </div>
        <div className="flex items-center">
          <Image src="/plus.svg" width={20} height={20} alt="agregar card" />
          <button onClick={handleAddCardClick}>Agregar otra tarjeta</button>
        </div>
      </div>
      {isModalOpen && (
        <NewCardModal
          setIsModalOpen={setIsModalOpen}
          handleCreateCard={handleCreateCard}
        />
      )}
    </div>
  );
}

export default List;

//importar import Image from "next/image" y luego agregar la imagen del + para agregar una card nuevo.
