import { h } from "preact";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Provider } from "redux-zero/preact";
import appStore from "../store/store";

export default _ => (
    <Provider store={appStore}>
        <div class="hero-body" style={"padding-top: 1.3em"}>
            <Header />
            <Content />
        </div>
    </Provider>
)