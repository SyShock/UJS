import { h, Component } from "preact";
import connectStore from "../store/connect";
import { setSearching, addFav, removeFav, Action, lockSite, clearLocks } from "../store/actions"
import * as REQ from '../models/providersURLs';
import { defaultStore } from "../store/store";
import ISO from '../utils/countryCode'
import { radioValues } from "./radio";

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
    page?: number,
    locked?: boolean
}

class Actions {
    setSearching = setSearching as Action
    removeFav = removeFav as Action
    addFav = addFav as Action
    lockSite = lockSite as Action
    clearLocks = clearLocks as () => any
}

interface Props extends defaultStore, Actions {
}

@connectStore(new Actions())
class Content extends Component<Props, any> {
    page: number
    resBackup: Array<any> = []
    state = {
        res: [] as Array<any>
    }
    node: Element = null;
    res: Object = {}

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
    componentWillReceiveProps(newProps: Props) {
        if (this.props.events.toggleFavs !== newProps.events.toggleFavs) {
            this.handleShowOnlyFavs(newProps.events.toggleFavs);
        }
        if (this.props.searching !== newProps.searching && newProps.isSearching) {
            this.handleSubmit(newProps);
        }

    }

    handleSubmit(newProps: Props) {
        const { searching, clearLocks, sites } = newProps

        // reset without rendering
        this.state.res = [] as any
        this.page = 1
        clearLocks()
        this.res = {}
        sites.forEach((site: IRequest) => {
            this.getRequest({ ...searching, ...site, page: this.page })
        })
        this.page++
    }

    getRequest(req: IRequest): boolean {
        const lastElement = this.node
        const { searchType, lockSite } = this.props
        const { site, country, noSiteAppend, locked } = req;
        if (locked) return false;
        const url = REQ.stitchUrl({
            ...req
        })
        REQ.request(url)
            .then(res => {
                return res.text()
            }).then(res => {
                this.props.setSearching(false);
                const _country = searchType !== radioValues.location ? country : null
                const _site = [ISO.shortHandles[_country], site].filter(Boolean).join(' - ')
                const array = REQ.stripDOM({ xml: res, site, country, noSiteAppend })
                if (array.length === 0 || (this.res[_site] || []).find(item => item.title.url === array[0].title.url)) {
                    if (searchType !== radioValues.location) {
                        lockSite({ site, _country })
                    } else {
                        lockSite({ site })
                    }
                    return false
                }
                this.res[_site] = [...(this.res[_site] || []), ...array]
                this.setState({
                    res: [...this.state.res, ...array]
                })
                if (lastElement) {
                    lastElement.scrollIntoView({ block: 'nearest' })
                }
            })
        return true // used to signal if there should be a loading animation
    }

    handleScroll = (ev: Event) => {
        const { sites, searching, isSearching } = this.props;
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
            && !this.props.events.toggleFavs
            && !isSearching) {
            sites.forEach(site => {
                if ( this.getRequest({ ...searching, ...site, page: this.page })) {
                    this.props.setSearching(true);
                }
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
                res: Object.values(favs)
            })
        }
    }

    renderSpecificSelection() {
        let { favs, filterBy } = this.props;
        return (
            Object.keys(this.res).map(
                key => {
                    const entry = this.res[key]
                    if (filterBy.indexOf(key) !== -1)
                        return entry.map((el: REQ.IJob) => {
                            return (
                                <div>
                                    <Card ref={node => this.node = node} onClick={this.handleFavClick} data={el} favs={favs} />
                                </div>
                            )
                        })
                }
            )
        )
    }

    getStyles() {
        const { isSearching } = this.props;
        return {
            hasLoader: isSearching ? 'is-loading' : '',
            wrapper: `padding-bottom: 25rem;`,
            loader: `width: 50%; top: 1rem`
        }
    }

    render() {
        const { res } = this.state;
        const { favs, filterBy } = this.props;
        const hasFilter = filterBy.length > 0
        const styles = this.getStyles()
        return (
            <div class="has-text-grey has-text-centered" style={styles.wrapper}>
                {!hasFilter && res.map((el: REQ.IJob) => {
                    return (
                        <div>
                            <Card ref={node => this.node = node} onClick={this.handleFavClick} data={el} favs={favs} />
                        </div>
                    )
                })
                }
                {hasFilter && this.renderSpecificSelection()}
                <div class={`control is-large ${styles.hasLoader}`} style={styles.loader}>
                </div>
            </div>
        )
    }
}

export {
    Content
}