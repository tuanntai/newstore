import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './component/PrivateRoute/PrivateRoute'
import SignIn from './pages/SignIn/SignIn'
import './App.less'
import Root from './layout/Root/Root'
import store from './redux/store'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage/HomePage'
import News from './pages/News/News'
import CreateNews from './pages/CreateNews/CreateNews'
import EditNews from './pages/EditNews/EditNews'
import NotFound from './pages/NotFound/NotFound'
import { getAccessToken } from './utils/localStorageService'

const App = () => {
  const accessToken = getAccessToken();
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<SignIn />} />
            <Route path="/" element={<PrivateRoute component={Root} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="news/" element={<News />} />
              <Route path="news/create-news" element={<CreateNews />} />
              <Route path="news/edit-news/:id" element={<EditNews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
