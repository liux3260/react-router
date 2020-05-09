import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter,
  matchPath
} from 'react-router-dom';
import PhotoList from "./components/PhotoList";
import CatList from "./components/CatList";
import DogList from "./components/DogList";
import ComputerList from "./components/ComputerList";
import axios from 'axios';
import './css/index.css';
import Nav from "./components/Nav";
import apiKey from "./components/config";
import Search from "./components/Search";
import ErrorPage from './components/ErrorPage';



class App extends Component  {
  //apiKey = config.apiKey;
  constructor() {
    super();
    this.state={
      photos:[],
      loading:true,
      dogs:[],
      cats:[],
      computers:[],
      
    };
  } 

  
  componentDidMount(){
    this.searchDogs();
    this.searchCats();
    this.searchComputers();

    const match = matchPath(this.props.history.location.pathname, {
      path: "/search/:name"
    });
    if (match && match.params.name) {
      let searchName = match.params.name;
      this.performSearch(searchName);
    }
    else{
      this.performSearch();
    }

    window.onpopstate =() =>{
      const match = matchPath(this.props.history.location.pathname, {
        path: "/search/:name"
      });
      if (match && match.params.name) {
        let searchName = match.params.name;
        this.performSearch(searchName);
      }
    }
    
  }


  searchDogs=(query = 'dogs')=>{
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          dogs:response.data.photos.photo
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }
    searchCats=(query = 'cats')=>{
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          cats:response.data.photos.photo
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }
    searchComputers=(query = 'computers')=>{

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          computers:response.data.photos.photo
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }

  performSearch=(query = 'cats')=>{
    this.setState({
      loading:true
    })

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos:response.data.photos.photo,
          loading:false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }

  render(){
    //this.performSearch();
    //console.log(this.props.history.location.pathname);
    return (
        <div className="container">
          <Route path = "/" render= {()=><Search onSearch={this.performSearch} history={this.props.history}></Search>}></Route>
          <Nav></Nav>
          {(this.state.loading)
          ?<p>Loading...</p>
          :<Switch>
            <Route exact path="/cats" render= {()=><CatList cats={this.state.cats} ></CatList>}></Route>
            <Route exact path="/dogs" render= {()=><DogList dogs={this.state.dogs} ></DogList>}></Route>
            <Route exact path="/computers" render= {()=><ComputerList computers={this.state.computers} ></ComputerList>}></Route>
            <Route path="/search/:name" render= {(props)=><PhotoList photoList = {this.state.photos} {...props}></PhotoList>}></Route>
            <Route component={ErrorPage}></Route>
          </Switch>
          }

        </div>

    );
  }
}


export default withRouter(App);