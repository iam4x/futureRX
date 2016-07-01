/* eslint max-len: 0 */

import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Link } from 'react-router'

import styles from 'app/styles/navbar.css'

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
            <Link to='/example'>Todo App</Link>
          </li>
          <li>
            <a href='https://github.com/iam4x/futureRX'>
              Github
            </a>
          </li>
        </ul>

        <ul className='nav navbar-nav navbar-right'>
          <li className={ styles.github }>
            <span dangerouslySetInnerHTML={ { __html: '<a class="github-button" href="https://github.com/iam4x/futureRX" data-icon="octicon-star" data-style="mega" data-count-href="/iam4x/futureRX/stargazers" data-count-api="/repos/iam4x/futureRX#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star iam4x/futureRX on GitHub">Star</a><a class="github-button" href="https://github.com/iam4x/futureRX/fork" data-icon="octicon-git-branch" data-style="mega" data-count-href="/iam4x/futureRX/network" data-count-api="/repos/iam4x/futureRX#forks_count" data-count-aria-label="# forks on GitHub" aria-label="Fork iam4x/futureRX on GitHub">Fork</a>' } } />
          </li>
        </ul>
      </div>
    </nav>


    <div className='container'>{ children }</div>
  </div>

export default withStyles(styles)(App)
