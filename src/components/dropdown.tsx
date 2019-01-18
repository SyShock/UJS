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

class DropMenu extends Component<any, any> {
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

    handleMenuClick = (ev: Event, val): void => {
        const { onSelect, hide } = this.props
        onSelect(val)
        hide()
    }

    render() {
        const { content } = this.props;
        return (
            <div class="dropdown-menu" id="dropdown-menu" role="menu" >
                <div class="dropdown-content">
                    {content && content.map((val) => (
                        <a class="dropdown-item" onClick={(ev) => this.handleMenuClick(ev, val)}>
                            {val.prefix}{val.site}{val.suffix}
                        </a>
                    ))}
                </div>
            </div>
        )
    }
}

class Dropdown extends Component<any, any> {
    static Trigger: typeof Trigger = Trigger;
    static Menu: typeof DropMenu = DropMenu;

    render() {
        return (
            <Trigger>
                <DropMenu></DropMenu>
            </Trigger>
        )
    }
}

export {
    Dropdown
}