import List from "./list";
import Card from "./card";
import NewCardModal from "./newCardModal";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState, useRef, useCallback } from "react";
import Image from 'next/image';

interface Card {
    id: string;
    title: string;
    user: string;
  }
  
  interface ListOfList {
    [listName: string]: Card[];
  }
  
  function Board() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState<boolean>(false);
    const [dragged, setDragged] = useState<{ list: string; data: Card } | null>(null);
    const boardColumns = useRef<string[] | undefined>(undefined);
    const [listOfList, setListOfList] = useState<ListOfList>({});
  
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
      const list = event.currentTarget.dataset.id;
  
      await fetch(`/api/move/${list}`, {
        method: 'POST',
        body: JSON.stringify({
          draggedList: dragged?.list,
          cardData: dragged?.data
        })
      });
  
      loadData();
    }
  
    const loadBoards = useCallback(async () => {
      let resp = await fetch('/api/board/all');
      let json = await resp.json();
      boardColumns.current = json;
    }, []);
  
    useEffect(() => {
      loadBoards();
    }, [loadBoards]);
  
    const loadData = useCallback(async () => {
      if (!boardColumns.current)
        await loadBoards();
  
      if (boardColumns.current) {
        const copyListOfList = { ...listOfList };
        console.log(boardColumns.current);
        for (let i = 0; i < boardColumns.current.length; i++) {
          const list = boardColumns.current[i];
          const doneResponse = await fetch(`/api/${list}`);
          const doneJson = await doneResponse.json();
          copyListOfList[list] = doneJson;
        }
  
        setListOfList(copyListOfList);
      }
    }, [listOfList, loadBoards]);
  
    const handleAddCardClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCreateCard = (title: string) => {
      const newCard: Card = {
        id: uuidv4(),
        title: title,
        user: 'Me'
      };
  
      fetch(`/api/add/${boardColumns.current?.[0]}`, {
        method: 'POST',
        body: JSON.stringify(newCard)
      });
  
      loadData();
      setIsModalOpen(false);
    };
  
    const handleCreateColumn = async (title: string) => {
      await fetch('/api/board', {
        method: 'POST',
        body: title
      });
  
      boardColumns.current = undefined;
      loadData();
      setIsCreateCardModalOpen(false);
    };
  
    const addNewBoardColumnClick = () => {
      setIsCreateCardModalOpen(true);
    }


    return (
        <div className="flex flex-col flex-1 gap-4 p-4">
            <div>
                <h1 className="text-2xl font-bold">Development <span onClick={addNewBoardColumnClick}><Image src="/plus.svg" width='20' height='20' alt='Agregar card' title='Agregar nueva card' /></span></h1>
            </div>
            <main className="flex flex-1 gap-6">
                {boardColumns.current && boardColumns.current.map((item, index) => {
                    return (<List                        
                        title={item}
                        id={item}
                        openModal={handleAddCardClick}
                        modalBoton={"Add new Card"}                        
                        handleDrop={handleDrop}
                        key={item}                                              
                        signoPlus={index === 0 ? <Image src="/plus.svg" width='20' height='20' alt='Agregar card' title='Agregar nueva card' /> : undefined}>
                        {listOfList && listOfList[item] && listOfList[item].map((cardItem) => {                            
                            return (
                                <Card cardData={{...cardItem, user: 'Your Name'}} key={cardItem.id} setDragged={setDragged} />
                            )
                        })}
                    </List>);
                })}
                {isModalOpen && (
                    <NewCardModal
                        setIsModalOpen={setIsModalOpen}
                        handleCreateCard={handleCreateCard}
                    />
                )} 


                {isCreateCardModalOpen && (
                    <NewCardModal
                        setIsModalOpen={setIsCreateCardModalOpen}
                        handleCreateCard={handleCreateColumn}
                    />
                )} 
            </main>
        </div>
    );
}

export default Board;
