import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/NavBar/NavBar';
import ContenedorDeGraficos from './components/Graficos/ContenedorDeGraficos';
import Templa from './pages/Templa';
import SidebarComponent from './components/SideBar/SidebarComponent';
import { UserProvider } from './context/userContext';
import ClientsTable from './components/DashBoardClients/ClientsTable';
import UsersTable from './components/users/usersTable';
import DashboardPurchase from './components/DashboardPuchaseDetail/DashboardPurchase';
import DashboardSells from './components/DashboardSell/DashboardSells';
import DashboardProducts from './components/DashboardProducts/DashboardProducts';
import DashboardProviders from './components/DashboardProviders/DashboardProviders';
import Inicio from './components/Inicio/Inicio';
import bgInicio from "./img/bgInicio.png"
import Profile from './components/Profile/Profile';
import ProviderProfile from './components/Profile/ProviderProfile';

function App() {
  const location = useLocation();



  useEffect(() => {
    if (
      location.pathname === '/ventasDashboard' ||
      location.pathname === '/comprasDashboard' ||
      location.pathname === '/productosDashboard' ||
      location.pathname === '/proveedoresDashboard' ||
      location.pathname.startsWith('/profile/')

    ) {
      document.body.style.backgroundColor = '#E6F4FF';
    }  else if (location.pathname === '/main') {
      document.body.style.backgroundImage = `url(${bgInicio})`;
      document.body.style.backgroundSize = 'cover'; 
      document.body.style.backgroundRepeat = 'no-repeat'; 
      document.body.style.backgroundColor = ''; 
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }, [location.pathname]);

  const renderSidebar = () => {
    // Ocultar el Sidebar en la ruta /inicio
    if (location.pathname === '/main') {
      return null;
    }
    // Renderizar el Sidebar para otras rutas
    return <SidebarComponent />;
  };



  return (
    <UserProvider>
      <Navbar />
      {renderSidebar()}
      <Routes>
        <Route path="/main" element={<Inicio />} />
        <Route path="/tables" element={<Main />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="ventasDashboard" element={<DashboardSells />} />
        <Route path="comprasDashboard" element={<DashboardPurchase />} />
        <Route path="productosDashboard" element={<DashboardProducts />} />
        <Route path="proveedoresDashboard" element={<DashboardProviders />} />
        <Route path="clientData" element={<ClientsTable />} />
        <Route path="usersData" element={<UsersTable />} />
        <Route path="profile/:clientId" element={<Profile />} />
        <Route path="providerProfile/:providerId" element={<ProviderProfile />} />

      </Routes>
    </UserProvider>
  );
}


export default App;
