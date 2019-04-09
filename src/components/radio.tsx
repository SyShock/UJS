import { h, Component } from "preact";
import connectStore from "../store/connect";
import { setSearchType, newSearch, Action } from "../store/actions"
import { defaultStore } from "../store/store";

export const radioValues = {
    all: 'all',
    remote: 'remote',
    location: 'location'
}

class Actions {
    setSearchType = setSearchType as Action
    newSearch = newSearch as Action
}

interface Props extends defaultStore, Actions {
}

@connectStore(new Actions())
export class Radio extends Component<Props, any> {
    state = {
        selected: 'all'
    }

    componentWillReceiveProps(newProps) {
        if (newProps.searchType !== this.props.searchType) {
            const type = newProps.searchType
            switch (type) {
                case (radioValues.all):
                    this.removeLocation(newProps)
                    break;
                case (radioValues.location):
                    break;
                case (radioValues.remote):
                    this.removeLocation(newProps)
                    break;
            }
        }
    }

    private removeLocation(props) {
        const searching = { ...props.searching }
        delete searching.location
        this.props.newSearch(searching);
    }

    componentWillMount() {
        this.state.selected = this.props.searchType
    }

    handleChange = (ev: Event) => {
        //@ts-ignore
        const name = ev.target.name
        this.setState({
            selected: name
        })
        this.props.setSearchType(name)
    }

    private isSelected = (val): boolean => {
        const { selected } = this.state
        return val === selected
    }

    render() {
        return (
            <div class="control">
                <label class="radio">
                    <input type="radio" name="all" checked={this.isSelected('all')} onChange={this.handleChange} />
                    All
                </label>
                <label class="radio" disabled>
                    <input type="radio" name="remote" checked={this.isSelected('remote')} onChange={this.handleChange} disabled/>
                    Remote
                </label>
                <label class="radio" >
                    <input type="radio" name="location" checked={this.isSelected('location')} onChange={this.handleChange} />
                    By Location
                </label>
            </div>
        )
    }
}
