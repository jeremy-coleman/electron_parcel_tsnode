import * as React from "react";
import {Provider} from 'mobx-react'

import state from './store'

export let AppProvider = props => 
  <Provider state={state}>
  {props.children}
  </Provider>



