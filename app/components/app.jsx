import React from 'react'
import DevTools from 'mobx-react-devtools'

type Props = {
  children: any
}

const { NODE_ENV } = process.env

const App = ({ children }: Props) => (
  <div className='app'>
    { children }

    { NODE_ENV === 'development' &&
      <DevTools position={ { bottom: 0, right: 20 } } /> }
  </div>
)

export default App
