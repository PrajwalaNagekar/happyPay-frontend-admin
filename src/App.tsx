import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Router from './routes/router'


function App() {

  const routing = useRoutes(Router)
  return routing
}


export default App
