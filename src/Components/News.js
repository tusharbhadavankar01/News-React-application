import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {  
  
  static defaultProps={
    country:'in',
    pageSize:12,
    category:"general",
    
}
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,

  }
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aba38f2a2a684fda8876db5bacddbe87&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data=await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);
      this.setState({articles:parsedData.articles,totalResult:parsedData.totalResult, loading:false})
    }

     handlePriviousClick=async()=>{
      console.log("Privous")
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aba38f2a2a684fda8876db5bacddbe87&page=${this.state.page -1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data=await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);

      this.setState({
        page:this.state.page -1,
        articles:parsedData.articles,loading:false
      })
    }

  handleNextClick= async()=>{
      console.log("next");
      if(this.state.page+1 > Math.ceil(this.state.totalResult/this.props.pageSize)){

      }
      else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aba38f2a2a684fda8876db5bacddbe87&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data=await fetch(url);
      let parsedData=await data.json()

      this.setState({
        page:this.state.page +1,
        articles:parsedData.articles, loading:false
      })
    }

    }
    
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:"25px 0px"}}>Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>

        {!this.state.loading && this.state.articles.map((element)=>{
              return <div className='col-md-4' key={element.url} >

            <NewsItem title={element.title ?element.title.slice(0,49):""} description={element.description?element.description.slice(0,80):""} imgUrl={element.urlToImage} newsUrl={element.url}/>
        </div>

        })}

        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type='button' className="btn btn-primary" onClick={this.handlePriviousClick}> &larr; Privious</button>
          <button disabled={(this.state.page+1 > Math.ceil(this.state.totalResult/this.props.pageSize))} type='button' className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
