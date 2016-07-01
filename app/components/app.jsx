import React from 'react'

type Props = {
  children: any
}

const App = ({ children }: Props) =>
  <div className='container'>{ children }</div>

export default App
