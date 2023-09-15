import React, { useState, useEffect } from 'react'
import Image from '../Assets/Poster.png'
import Logo from '../Assets/tv.png'
import min from '../Assets/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@ 1.png'
import orange from '../Assets/PngItem_1381056 1.png'
import play from '../Assets/Play.png'
import '../Styles/Home.css'
import { Link, NavLink, } from 'react-router-dom'
import axios from 'axios'






function HomePage() {
  

  const [input, setInput] = useState('')
  const [movie, setMovie] = useState([])


  async function fetchMovie() {
    try {
      const config = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie?api_key=79d50d0b258ce81609b056767b5f5166',
        params: { language: 'en-US', page: '1' },
        headers: {
          "Authorization": `Bearer 79d50d0b258ce81609b056767b5f5166`
        },
      }

      const { data } = await axios(config)

      setMovie(data.results)
    } catch (error) {
      console.log('err:', error)

    }

  }

  useEffect(() => {
    fetchMovie()
  }, [])

  // i want to check if movie include("spider", )
  const movieFilter = movie.filter((m) => m.original_title.toLowerCase().includes(input.toLowerCase()));
  console.log('sercer movie', movieFilter)

  return (
    <div>
    {/*  <div className="header" style={{ backgroundImage: `url(${Image})` }}>
  */}
  <div className="header" style={{ backgroundImage: `url(${Image})` }}>
        <header>
          <nav className='nav'>
            <div className="left-side" >
              <div className="logo" style={{ backgroundImage: `url(${Logo})` }}></div>
              <h2>MovieBox</h2>
            </div>
            <form className='form-input'>
              <input
                className='center search'
                type="text"
                placeholder='what do you want to watch'
                value={input}
                onChange={(event) => {

                  setInput(event.target.value)
                }}
              />

              <img src="../Assets/Icon.png" className="icon"/>

            </form>
            <div className="right-side">
              <p>sign in</p>
              <div className="div">
                <div className="menu one"></div>
                <div className="menu"></div>
              </div>

            </div>
          </nav>
        </header>
        <div className="description-box">
          <h1>John Wick 3: Parabellum</h1>
          <div className="descript-content">

            <div>
              <div className="mini-image text" style={{ backgroundImage: `url(${min})` }}></div>
              <span>86.0 / 100</span>
            </div>

            <div>
              <div className="orange" style={{ backgroundImage: `url(${orange})` }}></div>
              <span>97%</span>
            </div>

          </div>
          <div className="narration">
            <p>
              John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>

          </div>
          <Link to='/'>
            <button className='btn'>
              <span className="icon" style={{ backgroundImage: `url(${play})` }}> &nbsp; </span> &nbsp;

              Watch Trailer
            </button>
          </Link>
        </div>

      </div>
      <div className='main-home-container'>

        {
          movieFilter?.map((props) => (
            <NavLink to={`/${props.title}`}>
              <div key={props.id} className='movie-card' 
              onClick={()=>{
                console.log(props.title)
              }}
              >
                <img
                  className="img"
                  src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
                  alt={props.title}
                />
                <div className="movie-content">
                  <p className="movie-title"> Title:{props.title}</p>
                  <p className="movie-release-date">release-date:{props.release_date}</p>
                  <p>{props.vote_average}%</p>
                  <p>{props.vote_count}</p>

                </div>
              </div>
            </NavLink>
          ))
        }


      </div>
    </div>
  )
}

export default HomePage
