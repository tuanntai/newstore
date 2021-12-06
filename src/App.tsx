import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './component/PrivateRoute/PrivateRoute'
import SignIn from './pages/SignIn/SignIn'
import './App.less'
import Root from './layout/Root/Root'
import store from './redux/store'
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<SignIn />} />
            <Route path="/*" element={<PrivateRoute component={Root} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
