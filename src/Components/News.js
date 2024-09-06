import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {  
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capatalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,  // Loading is true by default
      page: 1,
      totalResults: 0
    }
    document.title = `NewsDekho-${this.capatalizeFirstletter(this.props.category)}`
  }

  async updateNews(page) {
    this.props.setProgress(5);
    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false, // Loading is set to false after data is fetched
      page: page 
    });
    
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ page: 1 }); // Reset to page 1 when category changes
      this.updateNews(1);
    }
  }

  handlePreviousClick = async () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, () => {
        this.updateNews(this.state.page);
      });
    }
  }

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.updateNews(this.state.page);
      });
    }
  }

  render() {
    const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: "25px 0px", marginTop: "80px" }}>
          Top {this.capatalizeFirstletter(this.props.category)} Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem 
                  title={element.title ? element.title.slice(0, 49) : ""}
                  description={element.description ? element.description.slice(0, 80) : ""}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            )
          })}
        </div>

        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type='button' className="btn btn-primary" onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>
          
          {/* Display current page and total pages */}
          <div className='text-center my-3'>
            <strong>Page: {this.state.page} of {this.state.loading ? '...' : totalPages}</strong> {/* Show '...' during loading */}
          </div>
          
          <button 
            disabled={this.state.page + 1 > totalPages} 
            type='button' 
            className="btn btn-primary" 
            onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}

export default News;
