import React from 'react'
import { Route } from 'react-router'

export default (
  <Route component={ require('./components/app') }>
    <Route path='/' component={ require('./components/about') } />
    <Route path='/example' component={ require('./components/todos') } />
    <Route path='*' component={ require('./components/not-found') } />
  </Route>
)
