import './index.scss';
import {createHome} from "./pages/home/Home";

const rootNode = document.getElementById('root');

rootNode.innerHTML = createHome();
