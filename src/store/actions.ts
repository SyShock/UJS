import { IURLRequest } from "../models/providersURLs";
import { defaultStore as Store, IStoreEvents } from './store'

export const newSearch = (state: Store, val): Store => ({ searching: val })
export const setSearching = (state: Store, val): Store => ({ isSearching: val })

export const addSite = (state: Store, val): Store => ({ sites: [...state.sites, val] })
export const removeSite = (state: Store, val): Store => {
    let { sites } = state
    sites = sites.filter(item => JSON.stringify(item) !== JSON.stringify(val))
    return { sites }
}

export const clearSites = (state: Store) => ({ sites: [] })

export const lockSite = (state: Store, val) => {
    const { sites } = state;
    const index = sites.findIndex(item => JSON.stringify(item) === JSON.stringify(val))
    sites[index] = { ...sites[index], locked: true }
    return { sites }
}

export const clearLocks = (state: Store) => {
    const sites = state.sites.map((site) => {
        delete site.locked
        return { ...site }
    })
    return { sites }
}

export const setSearchType = (state: Store, val): Store => ({ searchType: val })

export const emit = (state: Store, val): Store => {
    return { events: { ...state.events, ...val } }
}

export const addFav = (state: Store, fav): Store => {
    return { favs: { ...state.favs, [fav.title.url]: fav } }
}
export const removeFav = (state: Store, fav): Store => {
    const favs = state.favs
    delete favs[fav.title.url]
    return { favs: { ...favs } }
}

export const filterBySite = (state: Store, site: IURLRequest): Store => { //as a toggle
    const filterBy = state.filterBy;
    const index = filterBy.indexOf(site)
    if (index !== -1) {
        filterBy.splice(index, 1)
    } else {
        filterBy.push(site)
    }
    return { filterBy: [...filterBy] }
}

export type Action = (val: any) => any
