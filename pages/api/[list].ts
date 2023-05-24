import { TrelloBoard } from '../../components/helpers/storedLists';

export default function handler(req, res) {    
    if (!TrelloBoard[req.query.list])
        TrelloBoard[req.query.list] = [];

    res.status(200).json(TrelloBoard[req.query.list]);    
}