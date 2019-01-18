import { default as createStore} from "redux-zero";
// why did this change to <imported>.default?!

const reduxStore = 'redux-store'

class defaultStore { 
  orders: Array<any> = []
  isSearching: boolean = false
  favs: Object = {}
  searching: string =  ''
  sites: Array<any> = []
  filterBy: Array<any> = []
  events = {
    toggleFavs: false
  }
}

const savedStore = JSON.parse(localStorage.getItem(reduxStore))
const store: defaultStore = (savedStore && Object.keys(savedStore).length > 0) ? savedStore : new defaultStore()

const appStore = (createStore)(store);

window.onbeforeunload = () => {
  const _store = appStore.getState() as defaultStore
  _store.searching = ''
  _store.isSearching = false //prevent edgecase, where page is closed while loading
  localStorage.setItem(reduxStore, JSON.stringify(_store))
}

export default appStore
