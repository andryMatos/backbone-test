import './App.css';
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import { Contacts } from './pages/Contacts/Contacts';
import { ContactInfo } from './pages/Contacts/Contact';
import { AddContact } from './pages/Contacts/AddContact';
import { UpdateContact } from './pages/Contacts/UpdateContact';
import { DeleteContact } from './pages/Contacts/DeleteContact';
import { NotFound } from './pages/404';
import { ContactsTest } from './pages/Contacts/ContactTest';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Contacts/>}/>
            <Route path='/contacts/create' element={<AddContact/>}/>
            <Route path='/contacts/:id' element={<ContactInfo/>}/>
            <Route path='/contacts/:id/update' element={<UpdateContact/>}/>
            <Route path='/contacts/:id/delete' element={<DeleteContact/>}/>
            <Route path='/contacTest' element={<ContactsTest/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
