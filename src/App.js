import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import 'upkit/dist/style.min.css'
import { Provider } from 'react-redux'

import Home from './pages/Home'
import Register from './pages/Register'
import RegisterSuccess from './pages/RegisterSuccess'
import Login from './pages/Login'
import UserAddressAdd from './pages/UserAddressAdd'
import UserAddress from './pages/UserAdddress';
import Checkout from './pages/Checkout'
import Invoice from './pages/Invoice'


import store from './app/store'

// import fungsi listen
import { listen } from './app/listener'

import { getCart } from './api/cart'

function App() {

  // panggil fungsi listen() sekali saja saat komponen selesai render pertama kali
  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>

          <Route path="/invoice/:order_id">
            <Invoice />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/alamat-pengiriman/tambah">
            <UserAddressAdd />
          </Route>
          <Route path="/alamat-pengiriman/">
            <UserAddress />
          </Route>
          <Route path="/register/berhasil">
            <RegisterSuccess />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
