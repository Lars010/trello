export default function handler(req, res) {
    res.status(200).json([
        {
            title: 'Mover tarjetas',
            id: 3423,
            user: {
                name: 'Leonidas',
                avatar: '/avatar.png'
            },
        }
    ])
}