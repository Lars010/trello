import List from "./list"
import Card from "./card"
//import { todoList, inProgressList, doneList } from "./data"
import { useEffect, useState } from "react"


function Board() {
    const [dragged, setDragged] = useState(null)
    const [boardList, setBoardList] = useState([]);
    const [listOfList, setListOfList] = useState({})

    function handleDrop(event) {
        const list = event.currentTarget.dataset.id
        const listOfListClone = structuredClone(listOfList)

        const newList = listOfListClone[dragged.list].filter(item => item.id !== dragged.data.id)
        listOfListClone[dragged.list] = newList
        listOfListClone[list].push(dragged.data)
        setListOfList(listOfListClone)
    }



    const loadData = async () => {

        let lists = {};

        const boardResponse = await fetch('/api/lists');
        const board = await boardResponse.json();

        for (let loopIndex = 0; loopIndex < board.length; loopIndex++) {
            const item = board[loopIndex];
            const itemsResponse = await fetch(`/api/cards/${item.title}`);
            const items = await itemsResponse.json();
            lists[item.title] = items;
        }
        
        setBoardList(board);
        setListOfList(lists);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-col flex-1 gap-4 p-4">
            <div>
                <h1 className="text-2xl font-bold">
                    Development
                </h1>
            </div>
            <main className="flex flex-1 gap-6">
                {boardList && boardList.map((item) => (
                    <List title={item.title} handleDrop={handleDrop} id={item.title} key={item.title} >
                        {listOfList && listOfList[item.title] && listOfList[item.title].map(card => {
                            <Card {...card} key={card.id} setDragged={setDragged} />
                        })}
                    </List>
                ))}
            </main>
        </div>
    )
}

export default Board
