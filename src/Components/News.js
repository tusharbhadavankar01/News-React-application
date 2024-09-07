import React, { useState, useEffect, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = ({ country, pageSize, category, apiKey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capatalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = useCallback(async (page) => {
    setProgress(5);
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  }, [country, category, apiKey, pageSize, setProgress]);

  useEffect(() => {
    document.title = `NewsDekho-${capatalizeFirstletter(category)}`;
    updateNews(page);
  }, [category, page, updateNews]);

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className='container my-3'>
      <h1 className='text-center' style={{ margin: "25px 0px", marginTop: "80px" }}>
        Top {capatalizeFirstletter(category)} Headlines
      </h1>

      {loading && <Spinner />}

      <div className='row'>
        {!loading && articles.map((element) => (
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
        ))}
      </div>

      <div className='container d-flex justify-content-between'>
        <button disabled={page <= 1} type='button' className="btn btn-primary" onClick={handlePreviousClick}>
          &larr; Previous
        </button>

        <div className='text-center my-3'>
          <strong>Page: {page} of {loading ? '...' : totalPages}</strong>
        </div>

        <button 
          disabled={page + 1 > totalPages} 
          type='button' 
          className="btn btn-primary" 
          onClick={handleNextClick}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 12,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;