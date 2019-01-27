import { h, Component } from "preact";
import connectStore from "../store/connect";
import { setSearching, addFav, removeFav, Action } from "../store/actions"
import * as REQ from '../models/providersURLs';
import { defaultStore } from "../store/store";
import ISO from '../utils/countryCode'

const Card = (props) => {
    const { ref } = props;
    const { title, postedOn, company, location, site, salary } = props.data
    const isStarred = !!props.favs[title.url] ? 'starred' : ""
    return (
        <div class="card" ref={ref}>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <div class="wrapper">
                            <p>
                                <a target="_blank" class="title is-4" href={title.url} title={title.name}>{title.name}</a>
                                <div onClick={(ev) => props.onClick(ev, props.data)} title="Add to Favorites" class={`star-icon icon ${isStarred}`}>
                                    <i class={`fas fa-star`}></i>
                                </div>
                            </p>
                            <p class="subtitle is-6">
                                {company.url ?
                                    <a target="_blank" href={company.url} title={company.name}>{company.name}</a> :
                                    company.name
                                } &nbsp;
                            {location}
                            </p>
                        </div>
                        <p>{salary}</p>
                        <p>{postedOn} {site}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export interface IRequest {
    site: string
    keyword?: string
    location?: string
    country?: string
    noSiteAppend?: boolean
    page?: number
}

class Actions {
    setSearching = setSearching as Action
    removeFav = removeFav as Action
    addFav = addFav as Action
}

interface Props extends defaultStore, Actions {
}

@connectStore(new Actions())
class Content extends Component<Props, any> {
    page: number
    loadedFavs: boolean = false
    resBackup: {} = {}
    state = {
        res: {} as any
    }
    node: Element = null;

    constructor() {
        super()
        document.onscroll = this.handleScroll
    }

    componentWillMount() {
        if (this.props.events.toggleFavs) {
            this.handleShowOnlyFavs(true);
        }
    }

    //this needs to be managed better
    componentWillReceiveProps(newProps) {
        if (this.props.events.toggleFavs !== newProps.events.toggleFavs) {
            this.handleShowOnlyFavs(newProps.events.toggleFavs); return
        }
        if (this.props.searching !== newProps.searching) {
            this.handleSubmit(newProps); return
        }

    }

    handleSubmit(newProps: Props) {
        const { searching } = newProps

        // reset without rendering
        this.state.res = {} as any
        this.page = 1

        newProps.sites.forEach(site => {
            this.getRequest({ ...searching, ...site, page: this.page })
        })
        this.page++
    }

    getRequest(req: IRequest): void {
        const lastElement = this.node
        const { searchType } = this.props
        const { site, country, noSiteAppend } = req;
        const url = REQ.stitchUrl({
            ...req
        })
        REQ.request(url)
            .then(res => {
                return res.text()
            }).then(res => {
                this.props.setSearching(false);
                const _country = searchType !== 'location' ? country : null
                const _site = [ISO.shortHandles[_country], site].filter(Boolean).join(' - ')
                this.state.res[_site] = [...(this.state.res[_site] || []), ...REQ.stripDOM({ xml: res, site, country, noSiteAppend })]
                this.setState({
                    res: { ...this.state.res }
                })
                if (lastElement) {
                    lastElement.scrollIntoView({ block: 'nearest' })
                }
            })
    }

    handleScroll = (ev: Event) => {
        const { sites, searching, isSearching } = this.props;
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
            && !this.props.events.toggleFavs
            && !isSearching) {
            this.props.setSearching(true);
            sites.forEach(site => {
                this.getRequest({ ...searching, ...site, page: this.page })
            })
            this.page++
        }
    }

    handleFavClick = (ev: Event, cardProps) => {
        if (!!this.props.favs[cardProps.title.url]) {
            this.props.removeFav(cardProps)
        } else {
            this.props.addFav(cardProps)
        }
    }

    handleShowOnlyFavs = (val: boolean) => {
        const { favs } = this.props
        if (!val) {
            this.setState({
                res: this.resBackup
            })
        } else {
            this.resBackup = this.state.res
            this.state.res = {} as any;
            this.setState({
                res: {
                    favs: Object.values(favs)
                }
            })
        }
    }

    render() {
        let { res } = this.state;
        let { isSearching, favs, filterBy } = this.props;
        const hasFilter = filterBy.length > 0
        return (
            <div class="has-text-grey has-text-centered" style={`padding-bottom: 25rem;`}>
                {Object.keys(res).map(
                    key => {
                        const entry = res[key]
                        if (res.favs || !hasFilter || filterBy.indexOf(key) !== -1)
                            return entry.map((el: REQ.IJob) => {
                                return (
                                    <div>
                                        <Card ref={node => this.node = node} onClick={this.handleFavClick} data={el} favs={favs} />
                                    </div>
                                )
                            })
                    }
                )}
                <div class={`control is-large ${isSearching ? 'is-loading' : ''}`} style={`width: 50%; top: 1rem`}>
                </div>
            </div>
        )
    }
}

export {
    Content
}