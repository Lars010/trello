export default function handler(req, res) {
    res.status(200).json([
        {
            title: 'Implementar el diseno',
            id: 4223,
            user: {
                name: 'Leonidas',
                avatar: '/avatar.png'
            },
        },
        {
            title: 'Responsive Design',
            id: 43432,
            user: {
                name: 'Leonidas',
                avatar: '/avatar.png'
            },
        },
        {
            title: 'Columnas',
            id: 1133,
            user: {
                name: 'Leonidas',
                avatar: '/avatar.png'
            },
        }
    ])
}