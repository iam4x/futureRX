import React from 'react'
import { Link } from 'react-router'

type Props = {
  children: any
}

const App = ({ children }: Props) =>
  <div>
    <nav className='navbar navbar-inverse navbar-fixed-top'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          futureRX
        </Link>

        <ul className='nav navbar-nav'>
          <li>
            <Link to='/'>About</Link>
          </li>
          <li>
            <Link to='/example'>Todos</Link>
          </li>
        </ul>
      </div>
    </nav>


    <div className='container'>{ children }</div>
  </div>

export default App
