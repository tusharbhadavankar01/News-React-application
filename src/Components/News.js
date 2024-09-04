import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {    
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
      let url="https://newsapi.org/v2/everything?q=tesla&from=2024-08-04&sortBy=publishedAt&apiKey=aba38f2a2a684fda8876db5bacddbe87&page=1&pageSize=12";
      let data=await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);
      this.setState({articles:parsedData.articles,totalResult:parsedData.totalResult})
    }

     handlePriviousClick=async()=>{
      console.log("Privous")
      let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-08-04&sortBy=publishedAt&apiKey=aba38f2a2a684fda8876db5bacddbe87&page=${this.state.page -1}&pageSize=12`
      let data=await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);

      this.setState({
        page:this.state.page -1,
        articles:parsedData.articles
      })
    }

  handleNextClick= async()=>{
      console.log("next");
      if(this.state.page+1 > Math.ceil(this.state.totalResult/12)){

      }
      else{
      let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-08-04&sortBy=publishedAt&apiKey=aba38f2a2a684fda8876db5bacddbe87&page=${this.state.page +1}&pageSize=12`
      let data=await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);

      this.setState({
        page:this.state.page +1,
        articles:parsedData.articles
      })
    }

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
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type='button' className="btn btn-primary" onClick={this.handlePriviousClick}> &larr; Privious</button>
          <button type='button' className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
