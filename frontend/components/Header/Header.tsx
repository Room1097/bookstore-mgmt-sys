import React, { ReactNode } from 'react'

const Header = ({children} : {children : ReactNode}) => {
  return (
    <h1 className='text-4xl font-bold capitalize'>{children}</h1>
  )
}

export default Header