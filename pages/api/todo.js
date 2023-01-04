export default function handler(req, res) {
    res.status(200).json([
        {
            title: 'Agregar nuevas tarjetas',
            id: 123,
            user: {
                name: 'pepito',
                avatar: '/avatar.png'
            },
            comments: [
                {
                    text: 'este feature es prioritario',
                    user: {
                        name: 'pepito',
                        avatar: '/avatar.png'
                    },
                },
                {
                    text: 'Naaa es super facil',
                    user: {
                        name: 'leonidas',
                        avatar: '/avatar.png'
                    },
                }
            ]
        },
        {
            title: 'creacion de tarjetas',
            id: 123456,
            user: {
                name: 'Miguel',
                avatar: '/avatar.png'
            },
        },
        {
            title: 'Agregar usuarios',
            id: 12345,
            user: {
                name: 'Miguel',
                avatar: '/avatar.png'
            },
        }
    ])
}