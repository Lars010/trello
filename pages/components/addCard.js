import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

function AddCard({listId, setListId}) {
    const [cards, setCards] = useState([]);
  
    const handleAddCard = (title) => {
      const newCard = {
        id: uuidv4(),
        title,
        listId
      };
  
      setCards([...cards, newCard]);
    }
  
    return {
      handleAddCard,
      cards
    };
  }
  
  export default AddCard;