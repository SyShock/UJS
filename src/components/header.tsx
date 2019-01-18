import { h, Component } from "preact";
import connectStore from "../store/connect";
import { newSearch, setSearching, emit, addSite, removeSite, filterBySite } from "../store/actions"
import { Dropdown } from './dropdown'
import { IRequest } from './content'

const data: Array<IRequest> = [
    { site: 'stackoverflow' },
    { site: 'indeed', suffix: '.lu' },
    { site: 'indeed', suffix: '.es' },
    { site: 'indeed', prefix: 'de.' },
    { site: 'indeed', prefix: 'be.' },
    { site: 'monster', noSiteAppend: true }
]

const Badges = (props) => {
    const { sites, onClose, onClick, filterBy } = props; //how did it manage to execute filterBy when I didn't even have a ref to it?!
    const onButtonClick = (ev, val, isDark) => {
        if (isDark) onClick(val)
        onClose(val);
        ev.stopPropagation(); //to prevent parent's onClick
    }

    return (
        <div>
            {sites.map(val => {
                const key = [val.prefix, val.site, val.suffix].join('')
                const isDark = (filterBy.indexOf(key) !== -1) ? 'is-dark' : ''
                return (
                    <span class={`tag is-medium ${isDark}`} onClick={(ev) => onClick(val)}>
                        {key}
                        <button class="delete is-small" onClick={(ev) => onButtonClick(ev, val, isDark)}></button>
                    </span>
                )
            })}
        </div>
    )
}

@connectStore({ newSearch, setSearching, emit, addSite, removeSite, filterBySite })
class Header extends Component<any, any> {

    toggledFavs: boolean = false
    state = {
        input: '',
        loading: false,
        drop: false
    }

    constructor() {
        super();
    }

    componentWillReceiveProps(current, prev) { }

    handleSubmit = (ev): void => {
        ev.preventDefault() //submit refreshes the page, you need to prevent that behavior
        this.props.newSearch(this.state.input)
        this.props.setSearching(true);
    }

    handleInput = (ev): void => {
        this.setState({
            input: ev.target.value
        })
    }

    toggleFavs = (ev): void => {
        const { emit } = this.props;
        this.toggledFavs = !this.toggledFavs
        emit({
            toggleFavs: this.toggledFavs
        })
    }

    filter(target, source) {
        return target.filter(_t => {
            const _targetString = JSON.stringify(_t)
            return !source.find(_s => {
                const _sourceString = JSON.stringify(_s)
                return _targetString === _sourceString
            })
        })
    }

    render() {
        const { isSearching, addSite, removeSite, sites, filterBySite, filterBy } = this.props;
        let _data
        if (sites.length === 0) {
            _data = data
        } else {
            _data = this.filter(data, sites)
        }
        return (
            <div>
                <h2 class="title has-text-grey has-text-centered">Universal Jobs Search</h2>
                <a class="button is-light -fav-toggler" onClick={this.toggleFavs}>Show Favs Only</a>
                <Dropdown.Trigger>
                    <Dropdown.Menu content={_data} onSelect={addSite}></Dropdown.Menu>
                </Dropdown.Trigger>
                <div class="field">
                    <div class={`control is-medium`}>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" class="input is-medium searchfield" onInput={this.handleInput} placeholder="Query..." />
                        </form>
                    </div>
                </div>
                <Badges onClose={removeSite} onClick={filterBySite} sites={sites} filterBy={filterBy} />
            </div>
        )
    }
}

export {
    Header
}