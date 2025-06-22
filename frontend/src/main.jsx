import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css';
import { Provider } from 'react-redux';
import appStore from './utils/AppStore';
import AuthListener from './utils/AuthListener';

createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
        <AuthListener />
        <App /> 
    </Provider>    
)
