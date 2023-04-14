import { Navbar, Container } from 'react-bootstrap';
import './App.css';
import TodoPage from './Components/TodoPage';

const App = () => (
  <div className="vh-100 bg-dark">
    <div className="d-flex flex-column h-100">
      <Navbar expand="lg">
        <Container className="justify-content-center">
          <h1 className="header">Персональный менеджер задач</h1>
        </Container>
      </Navbar>
      <TodoPage />
    </div>
  </div>
);

export default App;
