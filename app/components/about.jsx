import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { markdown } from 'markdown'

import styles from 'app/styles/about.css'
import readme from 'README.md'

const about = () =>
  <div
    className={ styles.aboutContainer }
    dangerouslySetInnerHTML={ { __html: markdown.toHTML(readme) } } />

export default withStyles(styles)(about)
