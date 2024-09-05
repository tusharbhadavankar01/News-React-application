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
  capatalizeFirstletter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1)
  }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
            
        }
        document.title=`NewsDekho-${this.capatalizeFirstletter(this.props.category)}`
    }
      async updateNews(page){
        this.props.setProgress(5);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }
    
    async componentDidMount(){
      this.updateNews();
    }

     handlePriviousClick=async()=>{
      this.setState({ page: this.state.page - 1 });
    this.updateNews();
 
    }

  handleNextClick= async()=>{
      if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    }
    
  render() {
    const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:"25px 0px"}}>Top {this.capatalizeFirstletter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>

        {!this.state.loading && this.state.articles.map((element)=>{
              return <div className='col-md-4' key={element.url} >

            <NewsItem title={element.title ?element.title.slice(0,49):""} description={element.description?element.description.slice(0,80):""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>

        })}

        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type='button' className="btn btn-primary" onClick={this.handlePriviousClick}> &larr; Privious</button>
           {/* Display current page and total pages */}
           <div className='text-center my-3'><strong>Page: {this.state.page} of {totalPages}</strong></div>    
       <button disabled={(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))} type='button' className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
