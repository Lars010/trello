import { TrelloBoard } from './../../../components/helpers/storedLists';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        // Aca tendra que ir el codigo para poder hacer el drop de las nuevas cards        
        const cardItem = JSON.parse(req.body);
        const draggedList = cardItem.draggedList;       

        if (!TrelloBoard[draggedList])
            TrelloBoard[draggedList] = [];

        const newList = TrelloBoard[draggedList].filter(
            (item) => item.id !== cardItem.cardData.id
        );
        
        TrelloBoard[draggedList] = newList;        
        TrelloBoard[req.query.list].push(cardItem.cardData);        
        res.status(200).json(true);
    } else {
        res.status(500).json("An error occurred");
    }
}