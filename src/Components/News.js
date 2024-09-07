import React, { useState, useEffect, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = ({ country, pageSize, category, apiKey, setProgress, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const capatalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = useCallback(async (page) => {
    setProgress(5);
    setLoading(true);
    setError(null);

    try {
      const url = searchQuery 
        ? `https://newsapi.org/v2/everything?q=${searchQuery}&apikey=${apiKey}&page=${page}&pageSize=${pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=${apiKey}&page=${page}&pageSize=${pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status === 'ok') {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        if (parsedData.totalResults === 0) {
          setError('No results found');
        }
      } else {
        setError('An error occurred');
      }
    } catch (e) {
      setError('An error occurred');
    } finally {
      setLoading(false);
      setProgress(100);
    }
  }, [country, category, apiKey, pageSize, searchQuery, setProgress]);

  useEffect(() => {
    updateNews(page);
  }, [category, page, searchQuery, updateNews]);

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
        {searchQuery ? `Search Results for "${searchQuery}"` : `Top ${capatalizeFirstletter(category)} Headlines`}
      </h1>

      {loading && <Spinner />}
      {error && <div className='text-center'>{error}</div>}

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

      {!searchQuery && (
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
      )}
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
  searchQuery: PropTypes.string,
};

export default News;
