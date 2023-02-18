import List from "./list";
import Card from "./card";
import { v4 as uuidv4 } from "uuid";
import NewCardModal from "./newCardModal";
//import { todoList, inProgressList, doneList } from "./data"
import { useEffect, useState } from "react";
import Image from "next/image";

function Board() {
    const [cards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dragged, setDragged] = useState(null);
    const [listOfList, setListOfList] = useState({
        todoList: [],
        inProgressList: [],
        doneList: [],
    });

    function handleDrop(event) {
        const list = event.currentTarget.dataset.id;
        const listOfListClone = structuredClone(listOfList);

        // Aca tendra que ir el codigo para poder hacer el drop de las nuevas cards

        const newList = listOfListClone[dragged.list].filter(
            (item) => item.id !== dragged.data.id
        );
        listOfListClone[dragged.list] = newList;
        listOfListClone[list].push(dragged.data);
        setListOfList(listOfListClone);
    }

    const loadData = async () => {
        const doneResponse = await fetch("/api/done");
        const doneJson = await doneResponse.json();

        const inProgressResponse = await fetch("/api/inProgress");
        const inProgressJSON = await inProgressResponse.json();

        const todoResponse = await fetch("/api/todo");
        const todoJSON = await todoResponse.json();

        setListOfList({
            todoList: todoJSON,
            inProgressList: inProgressJSON,
            doneList: doneJson,
        });
    };

    const handleAddCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCreateCard = (title) => {
        const newCard = {
            key: uuidv4(),
            title: title,
        };
        const newList = { ...listOfList };
        newList.todoList.push(newCard);
        setListOfList(newList);
        setIsModalOpen(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-col flex-1 gap-4 p-4">
            <div>
                <h1 className="text-2xl font-bold">Development</h1>
            </div>
            <main className="flex flex-1 gap-6" >
                <List
                    title="TODO"
                    openModal={handleAddCardClick}
                    modalBoton={"Add new Card"}
                    signoPlus={<Image src="/plus.svg" width='20' height='20' alt='Agregar card' title='Agregar nueva card' />}
                    handleDrop={handleDrop}                    
                    id="todoList"
                >
                    {listOfList.todoList.map((item) => (
                        <Card {...item} key={item.id} setDragged={setDragged} />
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
                    {listOfList.inProgressList.map((item) => (
                        <Card {...item} key={item.id} setDragged={setDragged} />
                    ))}
                </List>
                <List
                    title="Done"
                    handleDrop={handleDrop}                    
                    id="doneList"
                >
                    {listOfList.doneList.map((item) => (
                        <Card {...item} key={item.id} setDragged={setDragged} />
                    ))}
                </List>
            </main>
        </div>
    );
}

export default Board;


