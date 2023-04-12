import { Provider } from 'react-redux';
import App from './App';
import store from './slices/index.js';

const init = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
