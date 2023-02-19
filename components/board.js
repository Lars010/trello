import List from "./list";
import Card from "./card";
import { v4 as uuidv4 } from "uuid";
import NewCardModal from "./newCardModal";
//import { todoList, inProgressList, doneList } from "./data"
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

function Board() {
    const [cards, setCards] = useState([]);
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
                                <Card {...cardItem} key={cardItem.id} setDragged={setDragged} />
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


