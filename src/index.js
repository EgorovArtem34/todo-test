import ReactDOM from 'react-dom/client';
import './index.css';
import init from './init';

const app = async () => {
  const vdom = document.getElementById('root');
  const root = ReactDOM.createRoot(vdom);
  root.render(await init());
};

app();
