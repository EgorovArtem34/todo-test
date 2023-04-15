import { useTranslation } from 'react-i18next';
import {
  Navbar, Container, Dropdown,
} from 'react-bootstrap';
import { BsGlobe } from 'react-icons/bs';
import './App.css';
import TodoPage from './Components/TodoPage';

const App = () => {
  const { i18n, t } = useTranslation();

  const handleLngChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="vh-100 bg-dark">
      <div className="d-flex flex-column h-100">
        <div className="d-flex justify-content-end mt-2 mx-2 text-center align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="success" className="d-flex align-items-center">
              <BsGlobe />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLngChange('ru')}>RU</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLngChange('en')}>EN</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Navbar expand="lg">
          <Container className="justify-content-center">
            <h1 className="header">{t('header')}</h1>
          </Container>
        </Navbar>
        <TodoPage />
      </div>
    </div>
  );
};

export default App;
