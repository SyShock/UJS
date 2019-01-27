import { h, Component } from "preact";
import { Dropdown } from "./dropdown";

interface Props {
    toFilter: Object
    onSelect: (val: any) => any
    placeholder: string
    attention: boolean
}

export class AutoCompleteInput extends Component<Props, any> {
    state = {
        dropped: false,
        content: [],
        selected: '',

    }
    node: any
    menuRefs: Array<any> = []
    focusedRef: any = null

    hide = () => {
        this.setState({ dropped: false })
    }

    handleInput = (ev: KeyboardEvent) => {
        const { value } = ev.target as any
        const { toFilter } = this.props
        if (value) {
            const content = this.filter(toFilter, value)
            this.setState({
                selected: value,
                content
            })
        }
    }

    handleKeyDown = (ev: KeyboardEvent) => {
        switch (ev.key) { 
            case 'ArrowDown': {
                let index = 0
                if (this.focusedRef) {
                    this.focusedRef.style.background = 'unset' //Todo: move the styling in Menu, somehow
                    index = this.menuRefs.indexOf(this.focusedRef) + 1
                }
                this.focusedRef = this.menuRefs[index]
                this.focusedRef.style.background = '#eee'
                this.focusedRef.scrollIntoView({ block: 'nearest' })
                return
            }
            case 'ArrowUp': {
                let index = this.menuRefs.length - 2
                if (this.focusedRef) {
                    this.focusedRef.style.background = 'unset'
                    index = this.menuRefs.indexOf(this.focusedRef) - 1
                }
                this.focusedRef = this.menuRefs[index]
                this.focusedRef.style.background = '#eee'
                this.focusedRef.scrollIntoView({ block: 'nearest' })
                return

            }
            case 'Enter': {
                this.focusedRef.style.background = 'unset'
                this.focusedRef.click()
                // this.focusedRef = null
                return
            }
        }
    }

    private filter(countries, value) {
        return Object.keys(countries).filter(item => item.toLowerCase().includes(value.toLowerCase()))
    }

    handleFocus = (ev) => {
        const { value } = ev.target
        const { toFilter } = this.props
        const content = this.filter(toFilter, value)
        this.setState({ dropped: true, content })
    }

    handleSelect = (val: string) => {
        const { toFilter } = this.props
        this.setState({
            selected: val
        })
        this.props.onSelect(toFilter[val].toLowerCase()) //this will be confusing, toFilter requires to be a key-value type
    }

    setMenuRefs = (element, index) => {
        this.menuRefs[index] = element;
    }

    render() {
        const {attention} = this.props
        const { dropped, content, selected } = this.state
        const hasContent = content.length > 0
        const isDanger = attention ? 'is-danger' : ''
        return (
            <div class="control dropdown is-active" ref={node => this.node = node}>
                <input class={`input ${isDanger}`} type="search" placeholder={this.props.placeholder} value={selected}
                    onKeyDown={this.handleKeyDown} onInput={this.handleInput} onFocus={this.handleFocus} />
                {dropped && hasContent && <Dropdown.Menu style={`top: 2rem;`} setRefs={this.setMenuRefs} onSelect={this.handleSelect}
                    content={content} hide={this.hide} node={this.node} />
                }
            </div>
        )
    }
}
