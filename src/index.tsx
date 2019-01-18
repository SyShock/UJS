import { h, render } from "preact";
import "./index.css";
import Main from "./pages/app"

const mountNode = document.getElementById('root');

render(<Main />, mountNode, mountNode.lastChild as Element);

// Hot Module Replacement
if (module.hot) {
    // require('preact/devtools')
    module.hot.accept();
}