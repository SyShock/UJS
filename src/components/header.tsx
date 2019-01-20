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

const keywordTooltip = `Python, Javascript, etc`
const locationTooltip = `Berlin, Budapest, NY, etc`

@connectStore({ newSearch, setSearching, emit, addSite, removeSite, filterBySite })
class Header extends Component<any, any> {

    toggledFavs: boolean = false
    state = {
        keyword: '',
        location: '',
        loading: false,
        drop: false
    }
    form: any


    constructor() {
        super();
    }

    componentWillReceiveProps(current, prev) { }

    handleSubmit = (ev): void => {
        const { location, keyword } = this.state;
        ev.preventDefault() //submit refreshes the page, you need to prevent that behavior
        this.props.newSearch({
            keyword,
            location
        })
        this.props.setSearching(true);
    }

    handleInput = (ev): void => {
        const name = ev.target.name
        this.setState({
            [name]: ev.target.value
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
                <h2 class="title has-text-grey has-text-centered">Universal Job Search</h2>
                <a class="button is-light -fav-toggler" onClick={this.toggleFavs}>Show Favorites Only</a>
                <Dropdown.Trigger>
                    <Dropdown.Menu content={_data} onSelect={addSite}></Dropdown.Menu>
                </Dropdown.Trigger>
                <div class="field">
                    <div class={`control is-medium`}>
                        <form class={`search-form`} onSubmit={this.handleSubmit}>
                            <input type="text" style={`width: 150rem;`} class="input search-field" name='keyword' onInput={this.handleInput} placeholder="Search..." title={keywordTooltip} />
                            <input type="text" style={`width: 50rem;`} class="input search-field" name='location' onInput={this.handleInput} placeholder="Location..." title={locationTooltip} />
                            <a class="button">
                                <span class="icon is-small" onClick={this.handleSubmit} title="Submit Query">
                                    <i class="fas fa-search"></i>
                                </span>
                            </a>
                            <button style={`display: none;`}></button>
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