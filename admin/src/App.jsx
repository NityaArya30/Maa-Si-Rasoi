import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import AddKitchen from './pages/KitchenAdd/addKitchen'
import KitchenList from './pages/KitchenList/KitchenList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          {/* ✅ Food Routes */}
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />

          {/* ✅ Kitchen Routes */}
          <Route path="/add-kitchen" element={<AddKitchen />} />
          <Route path="/kitchen-list" element={<KitchenList />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
