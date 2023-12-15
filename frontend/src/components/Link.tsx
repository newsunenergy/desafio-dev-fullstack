import React, { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export function Link({ children, to }: Props) {
    return (
        <RouterLink
            to={to}
            style={{
                textDecoration: 'underline',
            }}
        >
            {children}
        </RouterLink>
    )
}

type Props = {
    children: ReactNode
    to: string
}
