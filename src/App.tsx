import './App.css';
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import { Contacts } from './components/Contacts';
import { ContactInfo } from './components/Contact';
import { AddContact } from './components/AddContact';
import { UpdateContact } from './components/UpdateContact';
import { DeleteContact } from './components/DeleteContact';
import { NotFound } from './components/404';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Contacts/>}/>
          <Route path='/contacts/create' element={<AddContact/>}/>
          <Route path='/contacts/:id' element={<ContactInfo/>}/>
          <Route path='/contacts/:id/update' element={<UpdateContact/>}/>
          <Route path='/contacts/:id/delete' element={<DeleteContact/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
