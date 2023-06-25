import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import TablePage from './page/TablePage';
import FormPage from './page/FormPage';
import UpdateFormPage from './page/UpdateFormPage';
import ProductsDetailPage from './page/ProductsDetailPage'
import ProductsPage from './page/ProductsPage';
import LoginForm from './page/LoginForm';
import RegisterForm from './page/RegisterForm';
import ProtectedRounte from './component/wrapper/ProtectedRounte';

function App() {
  return (
   <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/detail/:id' element={<ProductsDetailPage/>} />

        {/* Protect Route */}
        <Route element={<ProtectedRounte/>}>
          <Route path='/table' element={<TablePage/>} />
          <Route path='/product' element={<ProductsPage/>} />
          <Route path='/create' element={<FormPage/>} />
          <Route path='/edit/:id' element={<UpdateFormPage/>} />
        </Route>
        
         {/* Guest Route */}
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/register' element={<RegisterForm/>} />
      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
