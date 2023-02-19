import { BoardList } from './../../../components/helpers/boardList';

export default function handler(req, res) {
    res.status(200).json(BoardList);    
}