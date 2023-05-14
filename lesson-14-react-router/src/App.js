import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Shop from './components/Shop';
import NotFound from './components/NotFound';
import Layout from './components/Layout'
import './App.css';

// Использование обычных ссылок <a></a> будет инициировать перезагрузку странички
// Поэтому в react-router-dom используется компонент <Link /> для всех внутренних ссылок 
// либо <NavLink /> для навигации (шапка)

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Важно: путь будут относительно корневого Layout */}
          <Route path="/" element={<Layout />}>
            {/*path не требуется, т.к. он есть у родительского элемента Route, index - указатель главной страницы*/}
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
