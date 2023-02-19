import { TrelloBoard } from './../../../components/helpers/storedLists';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request

        if (!TrelloBoard[req.query.list])
            TrelloBoard[req.query.list] = [];

        TrelloBoard[req.query.list].push(JSON.parse(req.body));
        console.log(`Added: ${JSON.stringify(req.body)}`);
        res.status(200).json(true);
    } else {
        res.status(500).json("An error occurred");
    }
}