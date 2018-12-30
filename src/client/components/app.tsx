import * as React from "react";
import {observer, inject} from 'mobx-react'
import {AppProvider} from './app-provider'
import {MineSweeper} from './minesweeper'

let AppBase = inject('state')(observer(({state}) => 
      <div>
        <section className="hero is-light is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Hello from Electron</h1>
              <p>{state.hello}</p>
              <h2 data-test="counter">{state.count}</h2>
              
              <button className="button" data-test="incButton" onClick={state.inc}>
                Inc count
              </button>
              
              <button className="button" data-test="resetButton" onClick={state.resetCount}>
                Reset
              </button>
              
            </div>
          </div>
          <h1 />
        </section>
        <MineSweeper rows={16} cols={24} totalBombs={12}/>
      </div>
))

let App = () => <AppProvider><AppBase/></AppProvider>

//function App = observer(() => (<AppBase />))

export default App


// what the fuck..
//import { hot } from 'react-hot-loader'
//export default hot(module)(App)
