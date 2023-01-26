const boardList = [
    {
        title: 'TODO',
        id: 123
    },
    {
        title: 'In Progress',
        id: 123456
    },
    {
        title: 'Completed',
        id: 123456
    },
    {
        title: 'Closed',
        id: 12345
    }
];

export default function handler(req, res) {
    res.status(200).json(boardList)
}