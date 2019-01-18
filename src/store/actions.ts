import { IURLRequest } from "../models/providersURLs";

export const newSearch = (state, val) => ({ searching: val })
export const setSearching = (state, val) => ({ isSearching: val })

export const addSite = (state, val) => ({ sites: [...state.sites, val] })
export const removeSite = (state, val) => {
    let {sites} = state
    sites = sites.filter(item => item !== val)
    return {sites}
}

export const emit = (state, val) => {
    console.log(state)
    return { events: { ...state.events, ...val } }
}

export const addFav = (state, fav) => {
    return { favs: {...state.favs, [fav.title.url]: fav} }
}
export const removeFav = (state, fav) => {
    const favs = state.favs
    delete favs[fav.title.url]
    return { favs: {...favs} }
}

export const filterBySite = (state, site: IURLRequest) => { //as a toggle
    const filterBy = state.filterBy;
    const _site = [site.prefix, site.site, site.suffix].join('')
    const index = filterBy.indexOf(_site)
    if (index !== -1){
        filterBy.splice(index, 1)
    } else {
        filterBy.push(_site)
    }
    return { filterBy: [...filterBy] }
}