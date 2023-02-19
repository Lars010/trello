import { BoardList } from './../../components/helpers/boardList';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        BoardList.push(req.body);        
        res.status(200).json(true);
    } else if (req.method === 'PUT') {
        // Process a POST request        
        BoardList[req.body.oldName] = req.body.newName;
        res.status(200).json(true);
    } else {
        res.status(500).json("An error occurred");
    }
}