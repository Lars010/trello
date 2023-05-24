import { TrelloBoard } from '../../../components/helpers/storedLists';

export default function handler(req: { method: string; body: string; query: { list: string | number; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string | boolean): void; new(): any; }; }; }) {
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