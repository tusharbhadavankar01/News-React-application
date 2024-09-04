import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {    
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false
        }
    }
    async componentDidMount(){
      let url="https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=aba38f2a2a684fda8876db5bacddbe87"
      let data=await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);
      this.setState({articles:parsedData.articles})
    }
    
  render() {
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        <div className='row'>

        {this.state.articles.map((element)=>{
              return <div className='col-md-4' key={element.url} >

            <NewsItem title={element.title ?element.title.slice(0,49):""} description={element.description?element.description.slice(0,80):""} imgUrl={element.urlToImage} newsUrl={element.url}/>
        </div>

        })}

        </div>
      </div>
    )
  }
}

export default News
