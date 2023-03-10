import List from "./list";
import Card from "./card";
import NewCardModal from "./newCardModal";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

function Board() {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
    const [dragged, setDragged] = useState(null);
    const boardColumns = useRef(undefined);
    const [listOfList, setListOfList] = useState({});

    const handleDrop = async (event) => {
        const list = event.currentTarget.dataset.id;

        await fetch(`/api/move/${list}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.         
            body: JSON.stringify({
                draggedList: dragged.list,
                cardData: dragged.data
            }) // body data type must match "Content-Type" header
        });
        loadData();
    }

    const loadBoards = async () => {
        let resp = await fetch('/api/board/all');
        let json = await resp.json();
        boardColumns.current = json;
    }

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

    }, []);

    const handleAddCardClick = () => {
        setIsModalOpen(true);
    };


    const handleCreateCard = (title) => {
        const newCard = {
            id: uuidv4(),
            title: title,
        };
        fetch(`/api/add/${boardColumns.current[0]}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.         
            body: JSON.stringify(newCard) // body data type must match "Content-Type" header
        });
        loadData();

        setIsModalOpen(false);
    };

    const handleCreateColumn = async (title) => {        
        await fetch('/api/board', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.         
            body: title // body data type must match "Content-Type" header
        });
        boardColumns.current = undefined;
        loadData();

        setIsCreateCardModalOpen(false);
    };

    const addNewBoardColumnClick = () => {
        setIsCreateCardModalOpen(true);
    }

    useEffect(() => {
        loadData();
    }, [loadData]);

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
                                <Card cardData={cardItem} key={cardItem.id} setDragged={setDragged} />
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

  return (
    <div className="flex flex-col flex-1 gap-4 p-4">
      <div>
        <h1 className="text-2xl font-bold">Development</h1>
      </div>
      <main className="flex flex-1 gap-6">
        <List
          title="TODO"
          openModal={handleAddCardClick}
          modalBoton={"Add new Card"}
          signoPlus={
            <Image
              src="/plus.svg"
              width="20"
              height="20"
              alt="Agregar card"
              title="Agregar nueva card"
            />
          }
          handleDrop={handleDrop}
          id="todoList"
        >
          {listOfList.todoList.map((cardData) => (
            <Card cardData={cardData} key={cardData.id} setDragged={setDragged} />
          ))}

          {isModalOpen && (
            <NewCardModal
              setIsModalOpen={setIsModalOpen}
              handleCreateCard={handleCreateCard}
            />
          )}
        </List>
        <List
          title="In Progress"
          handleDrop={handleDrop}
          id="inProgressList"
        >
          {listOfList.inProgressList.map((cardData) => (
            <Card  cardData={cardData} key={cardData.id} setDragged={setDragged} />
          ))}
        </List>
        <List
          title="Done"
          handleDrop={handleDrop}
          id="doneList"
        >
          {listOfList.doneList.map((cardData) => (
            <Card cardData={cardData} key={cardData.id} setDragged={setDragged} />
          ))}
        </List>
      </main>
    </div>
  );

}

export default Board;
