import ReactDOM from 'react-dom/client';
import './index.css';
import init from './init';

const app = () => {
  const vdom = document.getElementById('root');
  const root = ReactDOM.createRoot(vdom);
  root.render(init());
};

app();

