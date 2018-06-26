    import React, {Component} from 'react';
    import './App.css';

    const DEFAULT_QUERY = 'redux';
    const PATH_BASE = "https://hn.algolia.com/api/v1";
    const PATH_SEARCH = '/search';
    const PARAM_SEARCH = 'query=';
/*https://hn.algolia.com/api/v1/search?query=react*
    const url = '${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}';
    /*

    const list = [
        {
             title: 'React',
             url:'https://facebook.github.io/react/',
             author:'Jordan Walke',
             num_comments:3,
             points:4,
             objectID:0,
         },
         {
             title : 'Redux',
             url: 'https://github.com/reactjs/redux',
             author: 'Dan Abramov, Andew Clark',
             num_comments:2,
             points:5,
             objectID:1,
         },


    ];*/
{/*    const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());*/}


        class App extends Component {

            constructor(props) {
                super(props);
                this.state = {
                /*    list:list, */
                    result:null,
                    searchTerm:DEFAULT_QUERY,

                };
                this.setSearchTopStories = this.setSearchTopStories.bind(this);
                this.onSearchChange = this.onSearchChange.bind(this);
                this.onSearchSubmit = this.onSearchSubmit.bind(this); // Server-side search
                this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
                this.onDismiss = this.onDismiss.bind(this);

            }
        onDismiss(id) {
            /*
            const updatedList = this. state.list.filter(item => item.objectID !== id);  //dismiss
            this.setState({list:updatedList}); //updated new list
            */
            const isNotId = item => item.objectID !== id;
            const updatedHits = this.state.result.hits.filter(isNotId);
            /*object.assign, takes first argument as Target object, all following obejcts are source objects, target can be empty*/
            this.setState({result:Object.assign({},this.state.result,{hits:updatedHits})});
        }
        onSearchChange(event){
            this.setState({searchTerm:event.target.value});
        }


        setSearchTopStories(result){
            this.setState({result});
        }
        fetchSearchTopStories(searchTerm){
            fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
        }
        /*
        componentDidMount(){
            const{searchTerm} = this.state;
            fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error=> error);
        }*/
        /*server side lifecycle */
        componentDidMount(){
            const{searchTerm} = this.state;
            this.fetchSearchTopStories(searchTerm);
        }
        onSearchSubmit(event){
            const {searchTerm} = this.state;
            this.fetchSearchTopStories(searchTerm);
            event.preventDefault();
        }


        render(){
            /*
                        const{ searchTerm, list} = this.state;
                        return (
                            <div className = "App">
                            <form>
                              <input type = "text" value={searchTerm} onChange = {this.onSearchChange} />
                            </form>
                                {this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
                            <div key= {item.objectID}>
                                <span>
                                <a href = {item.url}> {item.title}</a>
                                </span>
                                <span>{item.author}</span>
                                <span>{item.num_comments}</span>
                                <span>{item.points}</span>
                                <span>
                                <button
                                    onClick = {() => this.onDismiss(item.objectID)} type = "button" > Dismiss </button>
                                </span>
                            </div>

                            )}

                </div>
            );
        }


                    const {searchTerm,list} = this.state;
                    return (
                        <div className = "App">
                        <Search
                            value = {searchTerm} //value
                            onChange = {this.onSearchChange}//on change
                        >
                        Search
                        </Search>
                        <Table
                        list = {list}
                        pattern = {searchTerm}
                        onDismiss = {this.onDismiss}
                        />
                        </div>
                    )
    }*/

                    const {searchTerm, result} = this.state;

                    /*if (!result){return null;}*/
                    return (
                        <div className = "page">
                            <div className = "intersactions">
                                <Search value = {searchTerm} onChange= {this.onSearchChange} onSubmit={this.onSearchSubmit}> Search </Search>
                            </div>
                            {/*{result ?<Table list={result.hits} pattern = {searchTerm} onDismiss={this.onDismiss}/>:null};*/}
                            {result ?<Table list={result.hits}  onDismiss={this.onDismiss}/>:null};
                            {/*<Table list = {result.hits} pattern = {searchTerm} onDismiss = {this.onDismiss} />
                            result && <Table list={result.hits} pattern={searchTerm} OnDismiss = {this.onDismiss}>*/}

                        </div>
                    );
    }}
    /*
    class Search extends Component {
            render(){
                const {value, onChange,children} = this.props;
                return (
                    <form>
                       {children}<input type = "text" value = {value} onChange = {onChange} />//display children
                    </form>
                );
            }
        }

        function Search(props) {
            const {value,onChange, children} = props;
            return (
                <form>
                {children}<input type = "text" value = {value}  onChange = {onChange} />
                </form>
            );
        }*/

        const Search = ({
            value,
            onChange,
            onSubmit,
            children
        }) =>
            <form onSubmit = {onSubmit}>
            <input type = "text" value = {value} onChange = {onChange} />
            <button type = "submit" > {children} </button>
            </form>
    /*    // const largeColumn = {width:40%,};
        // <span style  = {largeColumn} >
        */

        {/*const Table = ({list, pattern, onDismiss}) =>*/}
        const Table = ({list, onDismiss}) =>
            <div className = "table">
            {/* {list.filter(isSearched(pattern)).map(item=>*/}
            {list.map(item=>
                <div key = {item.objectID} className = "table-row">
                <span style = {{width:'40%'}}>
                    <a href = {item.url}>{item.title}</a>
                </span>

                <span style = {{width:'30%'}}>{item.author}</span>
                <span style = {{width:'10%'}}>{item.num_comments}</span>
                <span style = {{width:'10%'}}>{item.points}</span>
                <span style = {{width:'10%'}}>
                    <Button onClick = {()=> onDismiss(item.objectID)} className = "button-inline"> Dismiss </Button>
                </span>
                </div>
            )}
            </div>

    /*
    class Table extends Component{
        render(){
            const Table = ({list, pattern, onDismiss}) =>

            return (

                <div className = "table">
                {list.filter(isSearched(pattern)).map(item =>
                    <div key = {item.objectID}>
                    <span>
                    <a href = {item.url}>{item.title}</a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                    <span>
                    <Button onClick={() => onDismiss(item.objectID)}> Dismiss </Button>//go through component
                    </span>
                    </div>


                )}
                </div>
            );
        }

    }*/
    class Button extends Component{
        render(){
            const{
                onClick ,className = '',children} = this.props;


            return (
                <button onClick = {onClick} className  = {className} type = "button"> {children} </button>
            );
        }
    }

    export default App;
