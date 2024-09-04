import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    const { title, description, imgUrl, newsUrl } = this.props;

    const cardStyles = {
      width: "100%",
      maxWidth: "26rem",
      height: "400px", // Fixed height
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      margin: "auto", // Centers the card horizontally
    };

    const imageStyles = {
      width: "100%",
      height: "200px", // Fixed height for the image
      objectFit: "cover",
    };

    const cardBodyStyles = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "1rem", // Added padding for better spacing
      height: "calc(100% - 200px)", // Adjust height for the card body
      overflow: "hidden",
    };

    const cardTitleStyles = {
      marginBottom: "0.5rem",
      fontSize: "1.25rem", // Responsive font size
      fontWeight: "bold",
    };

    const cardTextStyles = {
      flexGrow: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 3,
      fontSize: "1rem", // Responsive font size
    };

    const buttonStyles = {
      alignSelf: "flex-start",
      marginTop: "auto", // Pushes the button to the bottom
    };

    return (
      <div className='container my-3' style={{ padding: "0 1rem" }}>
        <div className="card" style={cardStyles}>
          <img src={imgUrl} className="card-img-top" alt="..." style={imageStyles} />
          <div className="card-body" style={cardBodyStyles}>
            <h5 className="card-title" style={cardTitleStyles}>{title}...</h5>
            <p className="card-text" style={cardTextStyles}>{description}...</p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary" style={buttonStyles}>Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
