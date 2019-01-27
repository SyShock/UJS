import { h, Component } from "preact";
import connectStore from "../store/connect";
import { newSearch, setSearching, emit, addSite, removeSite, filterBySite, Action, clearSites } from "../store/actions"
import { Dropdown } from './dropdown'
import { IRequest } from './content'
import { Radio } from "./radio";
import { defaultStore } from "../store/store";
import { AutoCompleteInput } from "./dropdown-input";

import * as indeed from '../utils/indeed'
import * as monster from '../utils/monster'
import ISO from '../utils/countryCode'


const _data: Array<IRequest> = [
    { site: 'stackoverflow' },
    { site: 'indeed' },
    { site: 'monster', noSiteAppend: true }
]


const onAllSelected = (name, sites: any): Array<IRequest> => {
    return Object.keys(sites).map(key => ({ site: name, country: key }))

}

const Badges = (props) => {
    const { sites, onClose, onClick, filterBy } = props; //how did it manage to execute filterBy when I didn't even have a ref to it?!
    const onButtonClick = (ev, index, val, isDark) => {
        if (isDark) onClick(val)
        onClose(index);
        ev.stopPropagation(); //to prevent parent's onClick
    }

    return (
        <div>
            {sites.map((val, index) => {
                const isDark = (filterBy.indexOf(val) !== -1) ? 'is-dark' : ''
                return (
                    <span class={`tag is-medium ${isDark}`} onClick={(ev) => onClick(val)}>
                        {val}
                        <button class="delete is-small" onClick={(ev) => onButtonClick(ev, index, val, isDark)}></button>
                    </span>
                )
            })}
        </div>
    )
}

const keywordTooltip = `Python, Javascript, etc`
const locationTooltip = `Berlin, Budapest, NY, etc`

class Actions {
    newSearch = newSearch as Action
    setSearching = setSearching as Action
    emit = emit as Action
    addSite = addSite as Action
    removeSite = removeSite as Action
    filterBySite = filterBySite as Action
    clearSites = clearSites as () => any
}

interface Props extends defaultStore, Actions {
}


@connectStore(new Actions())
class Header extends Component<Props, any> {

    state = {
        keyword: '',
        location: '',
        country: '',
        loading: false,
        drop: false,
        countryRequirement: false
    }
    form: any

    data: Array<IRequest>
    _data: Array<any>
    _sites: Array<any> = []

    constructor() {
        super();
    }

    componentWillMount() {
        this.handleSearchTypeChange(this.props)
        this.handleSitesChange(this.props.sites)
    }

    componentWillReceiveProps(newProps: Props) {
        if (this.props.sites !== newProps.sites) {
            this.handleSitesChange(newProps.sites)
        }
        if (this.props.searchType !== newProps.searchType) {
            this.props.clearSites();
            this.handleSearchTypeChange(newProps)
            this.handleSitesChange(this.props.sites)
        }
    }

    handleSubmit = (ev): void => {
        const { location, keyword, country } = this.state;
        const { searchType } = this.props
        ev.preventDefault() //submit refreshes the page, you need to prevent that behavior
        if (searchType === 'location' && !country) {
            this.setState({ countryRequirement: true })
            return;
        }
        if (this._sites.length < 0){
            return;
        }
        this.props.newSearch({
            keyword,
            location,
            country
        })
        this.props.setSearching(true);
    }

    handleSearchTypeChange(props: Props) {
        switch (props.searchType) {
            case 'all': this.data = onAllSelected('indeed', indeed.stitcher); break;
            case 'remote': this.data = _data; break;
            case 'location': this.data = _data; break;
            default: this.data = _data; break;
        }
    }

    handleSitesChange(sites: Array<any>) {
        this._sites = sites.map(item => [ISO.shortHandles[item.country], item.site].filter(Boolean).join(' - '))
        if (this.data.length === 0) {
            this._data = this.data
        } else {
            this._data = this.filter(this.data, sites)
        }
    }

    handleInput = (ev): void => {
        const name = ev.target.name
        this.setState({
            [name]: ev.target.value
        })
    }

    toggleFavs = (ev): void => {
        const { emit, events } = this.props;
        emit({
            toggleFavs: !events.toggleFavs
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
    addSite = (val, index) => {
        const { addSite } = this.props;
        addSite(this._data[index])
    }
    removeSite = (index) => {
        const { sites, removeSite } = this.props
        removeSite(sites[index])
    }

    handleCountrySelect = (country) => {
        this.setState({
            country,
            countryRequirement: false
        })
    }

    handleBadgeClick = (val:string) => {
        const {searchType, filterBySite} = this.props
        if (searchType !== 'location') {
            const splitString = val.split(' - ')
            val = `${splitString[1]}.${ISO.handles[splitString[0]]}`
            filterBySite(val)
        } else {
            filterBySite(val)
        }
        
    }

    render() {
        const { countryRequirement } = this.state
        const { filterBySite, filterBy, searchType, searching } = this.props;
        const _data = this._data.map(item => [ISO.shortHandles[item.country], item.site].filter(Boolean).join(' - '))
        const isLocation = searchType === 'location'

        return (
            <div>
                <h2 class="title has-text-grey has-text-centered">Universal Job Search</h2>
                <Radio />
                <a class="button is-light -fav-toggler" onClick={this.toggleFavs}>Show Favorites Only</a>
                <Dropdown.Trigger>
                    <Dropdown.Menu content={_data} onSelect={this.addSite}></Dropdown.Menu>
                </Dropdown.Trigger>
                <div class="field">
                    <div class={`control is-medium`}>
                        <form onSubmit={this.handleSubmit}>
                            <div class="search-form">
                                <input type="search" class="input search-field" name='keyword' onInput={this.handleInput} placeholder={searching.keyword || "Search..."} title={keywordTooltip} />
                                <a class="button">
                                    <span class="icon is-small" onClick={this.handleSubmit} title="Submit Query">
                                        <i class="fas fa-search"></i>
                                    </span>
                                </a>
                            </div>
                            <button style={`display: none;`}></button>
                        </form>

                        {isLocation && (<div class="search-form">
                            <AutoCompleteInput attention={countryRequirement} toFilter={ISO.handles} onSelect={this.handleCountrySelect} placeholder="Country" />
                            <input type="search" class="input search-field" name='location' onInput={this.handleInput} placeholder={searching.location || "Location..."} title={locationTooltip} />
                        </div>
                        )}
                    </div>
                </div>
                <Badges onClose={this.removeSite} onClick={filterBySite} sites={this._sites} filterBy={filterBy} />
            </div>
        )
    }
}

export {
    Header
}