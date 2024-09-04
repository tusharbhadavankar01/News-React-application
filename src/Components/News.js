import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
    articles= [
        {
          "source": {
            "id": "the-verge",
            "name": "The Verge"
          },
          "author": "Kevin Nguyen",
          "title": "Is tennis the sport of the future?",
          "description": "The sport is taking big swings at TikTok, sports gambling, and Saudi Arabia.",
          "url": "http://www.theverge.com/c/24225103/tennis-ai-electronic-line-calling-hawk-eye-sports-betting-gambling",
          "urlToImage": "https://cdn.vox-cdn.com/thumbor/3EdSIy5ZZv7ML_Qrhw_pF3T5bJU=/49x170:1992x1190/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/25595941/WHATS_IN_WHATS_OUT_TENNIS_CHORUS_LEDE.jpg",
          "publishedAt": "2024-09-02T14:00:29Z",
          "content": "dId been promised the future of tennis was in the desert.\r\nFrom the stands of the Next Gen ATP Finals in Jeddah, Saudi Arabia, I watched as the eighth seed, Abdullah Shelbayh, was given the most dram… [+35005 chars]"
        },
        {
          "source": {
            "id": "associated-press",
            "name": "Associated Press"
          },
          "author": "JULIANNA RUSS and GABRIELLA ETIENNE",
          "title": "Paralympics fans learn when to be silent and when to make noise at sports for the visually-impaired",
          "description": "PARIS (AP) — A soft voice from the loudspeaker reminds the restless crowd: “Shhh. Shhh.”The whistle blows.Suddenly, spectators fall silent and even the slightest noise echoes through the Eiffel Tower Stadium.",
          "url": "https://apnews.com/2ecaf2a27d840886cd6c5f822cc706c6",
          "urlToImage": "https://storage.googleapis.com/afs-prod/media/bc09c0e5b08d46a38d416f67f6011833/3000.jpeg",
          "publishedAt": "2024-09-02T11:50:00Z",
          "content": "PARIS (AP) — A soft voice from the loudspeaker reminds the restless crowd: “Shhh. Shhh.”The whistle blows.Suddenly, spectators fall silent and even the slightest noise echoes through the Eiffel Tower… [+4103 chars]"
        },
        {
          "source": {
            "id": "fox-sports",
            "name": "Fox Sports"
          },
          "author": "John Fanta, Michael Cohen",
          "title": "College basketball roundtable: Michigan State's tourney streak, top transfers and more",
          "description": "Is Michigan State's NCAA Tournament streak in jeopardy? Who is the top transfer in the nation? FOX Sports' college basketball experts answer that and more.",
          "url": "http://www.foxsports.com/stories/college-basketball/college-basketball-roundtable-michigan-states-tourney-streak-top-transfers-and-more",
          "urlToImage": "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2024/02/1408/814/2024-02-29_College-Basketball-Roundtable_16x9.jpg?ve=1&tl=1",
          "publishedAt": "2024-02-29T20:59:30Z",
          "content": "It's almost time, ladies and gentlemen!\r\nThat long-awaited, fun-filled day when you wait to hear your team's name called before breaking out a pen and paper to fill out your NCAA Tournament bracket i… [+17577 chars]"
        },
        {
          "source": {
            "id": "bleacher-report",
            "name": "Bleacher Report"
          },
          "author": null,
          "title": "New Micah Parsons Show ",
          "description": "Fan easier, fan faster and fan better with Bleacher Report. Keep up with the latest storylines, expert analysis, highlights and scores for all your favorite sports.",
          "url": "https://bleacherreport.com/videos/490566-the-edge-w-micah-parsons-ep-11-vod",
          "urlToImage": null,
          "publishedAt": "2023-11-27T20:37:24.6381564Z",
          "content": null
        },
        {
          "source": {
            "id": "bleacher-report",
            "name": "Bleacher Report"
          },
          "author": null,
          "title": " Mikal Bridges Interview ",
          "description": "Fan easier, fan faster and fan better with Bleacher Report. Keep up with the latest storylines, expert analysis, highlights and scores for all your favorite sports.",
          "url": "https://bleacherreport.com/videos/491103-taylor-rooks-x-mikal-bridges-vod",
          "urlToImage": null,
          "publishedAt": "2023-11-27T20:37:24.3882176Z",
          "content": "Nets star sits down with Taylor Rooks for exclusive convo."
        }
      ]
      
    constructor(){
        super();
        this.state={
            articles:this.articles,
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
