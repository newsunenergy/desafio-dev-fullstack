import React from 'react'
import App from './pages/App'
import Simulate from './pages/Simulate'
import ListSimulations from './pages/ListSimulations'

export const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/listagem',
        element: <ListSimulations />,
    },
    {
        path: '/simular',
        element: <Simulate />,
    },
]
