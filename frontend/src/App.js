import React from 'react'
import './App.css'

import BoxFind from './component/BoxFind'
import Menu from './component/Menu'
import List from './component/List'
import Detail from './component/Detail'
import Notification from './component/Notification'

import { ContextConfigMain } from './util/Context'

export default function App() {
  return (
    <ContextConfigMain>
      <div className="app">
        <BoxFind />
        <Menu />
        <List />
        <Detail />
        <Notification value={"notifications here..."} />
      </div>
    </ContextConfigMain>
  );
}
