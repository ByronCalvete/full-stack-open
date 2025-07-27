import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import AppBootstrap from './AppBootstrap'
import AppMaterialUI from './AppMaterialUI'
import AppStyledComponents from './AppStyledComponents'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    {/* <AppBootstrap /> */}
    {/* <AppMaterialUI /> */}
    <AppStyledComponents />
  </Router>
)
