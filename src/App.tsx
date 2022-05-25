import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import './App.less'
import Root from './layout/Root/Root'
import store from './redux/store'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage/HomePage'
import NotFound from './pages/NotFound/NotFound'
import SignUp from './pages/SignUp/SignUp'
import User from './pages/User/User'
import CreateBook from './pages/CreateBook/CreateBook'
import BookInfo from './pages/BookInfo/BookInfo'
import { PrivateRoute } from './component/PrivateRoute/PrivateRoute'
import AddFund from './pages/AddFund/AddFund'
import BookManager from './pages/Book/BookManager'
import UserManager from './pages/UserManager/UserManager'
import Delivery from './pages/Delivery/Delivery'
import Receipt from './pages/Receipt/Receipt'
import EditBook from './pages/EditBook/EditBook'
import ReceiptInfo from './pages/ReceiptInfo/ReceiptInfo'
import Analyze from './pages/Analyze/Analyze'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<SignIn />} />
            <Route path="/" element={<Root />}>
              <Route path="/" element={<HomePage />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="add-fund" element={<AddFund />} />
              <Route path="user/" element={<PrivateRoute component={User} />} />
              <Route path="user-manager/" element={<PrivateRoute component={UserManager} />} />
              <Route path="book-manager/" element={<PrivateRoute component={BookManager} />} />
              <Route path="book-manager/edit/:id" element={<EditBook />} />
              <Route path="receipt/" element={<PrivateRoute component={Receipt} />} />
              <Route path="receipt/:id" element={<PrivateRoute component={ReceiptInfo} />} />
              <Route path="delivery/" element={<PrivateRoute component={Delivery} />} />
              <Route path="analyze/" element={<PrivateRoute component={Analyze} />} />

              <Route path="book/create-book" element={<PrivateRoute component={CreateBook} />} />
              <Route path="book/:id" element={<BookInfo />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
