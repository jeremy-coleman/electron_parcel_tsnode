import * as React from 'react'

import { hot } from 'react-hot-loader';
import {MineSweeper} from './minesweeper'


// export function Hello(){
//  return  <div>hiz</div>
// }

class MineSweeperBase extends React.Component {
    public render(): JSX.Element {
        return (
          <div>
          <MineSweeper rows={16} cols={24} totalBombs={12}/>
          </div>
                

        );
    }
}


const App = () => (
    <MineSweeperBase />
)

export default hot(module)(App)

