import { createLoginForm } from './pages/home/modules/login';
import './index.scss';

const rootNode = document.getElementById('root');

rootNode.innerHTML = createLoginForm();
