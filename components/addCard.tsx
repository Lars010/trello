import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

interface Card {
  id: string;
  title: string;
  listId: string;
}

interface AddCardProps {
  listId: string;
  setListId: (listId: string) => void;
}

function AddCard({ listId, setListId }: AddCardProps) {
  const [cards, setCards] = useState<Card[]>([]);

  const handleAddCard = (title: string) => {
    const newCard: Card = {
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