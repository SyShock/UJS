import { h, Component } from "preact";

class Trigger extends Component<any, any> {
    state: {
        dropped: false
    }
    node: any

    toggleDrop = (): void => {
        const { dropped } = this.state;
        this.setState({ dropped: !dropped })
    }

    hide = (): void => {
        this.setState({ dropped: false })
    }

    render() {
        const { dropped } = this.state
        const { children } = this.props;
        const Menu = children.filter(el => el.nodeName === DropMenu)[0] //using .nodeName will likely cause some incompatibility
        return (
            <div class={`dropdown is-active`} ref={node => this.node = node}>
                <div class="dropdown-trigger" onClick={this.toggleDrop}>
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Select Sites</span>
                        <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                {Menu && dropped && <Menu.nodeName node={this.node} hide={this.hide} {...Menu.attributes} />}
            </div>
        )
    }
}

type MenuProps = {
    content: Array<any>,
    node?: any,
    hide?: () => void,
    onSelect: (...any) => void
    setRefs?: (element: any, index: number) => void
    style: string
}

class DropMenu extends Component<MenuProps, any> {
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick = (ev: Event): boolean => {
        const { node, hide } = this.props
        if (node.contains(ev.target)) {
            return;
        }
        hide()
    }

    handleMenuClick = (ev: Event, val, index): void => {
        const { onSelect, hide } = this.props
        onSelect(val, index)
        hide()
    }

    render() {
        const { content, setRefs, style } = this.props;
        return (
            <div class="dropdown-menu" id="dropdown-menu" role="menu" style={style} >
                <div class="dropdown-content">
                    {content && content.map((val, index) => (
                        <a class="dropdown-item" ref={node => {setRefs && setRefs(node,index)}} onClick={(ev) => this.handleMenuClick(ev, val, index)}>
                            {val}
                        </a>
                    ))}
                </div>
            </div>
        )
    }
}

class Dropdown {
    static Trigger: typeof Trigger = Trigger;
    static Menu: typeof DropMenu = DropMenu;

}

export {
    Dropdown
}