onload = ()=>{
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let getMovie = ()=>{
     let noDatamsg = "unavailable";
    let movieName = movieNameRef.value;
    if(movieName.length<=0){
        result.innerHTML =`<h3>Please enter a movie name</h3>`;
    }
    else{
        fetch(`https://www.omdbapi.com/?s=${movieName}&type=movie&apikey=795d5a65`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const movies = data.Search; 
    const movieList = document.getElementById('result');
    movieList.innerHTML = ''; 
    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      fetch(`https://www.omdbapi.com/?t=${movie.Title}&type=movie&apikey=795d5a65`).then((movieData)=> movieData.json()).then((movieData)=>{
        movieDiv.classList.add('info');
      movieDiv.innerHTML = `
      
        <img src="${movieData.Poster}" alt="movieData poste unavailable" class="poster">
        <div id="movie_desc">
          <h2>${movieData.Title}</h2>
          <div class="rating">
            <span class="fa fa-star"></span>
            <h4>${movieData.imdbRating || noDatamsg}</h4>
          </div>
        </div>
        <div>
          <span> Plot : ${movieData.Plot}</span>
        </div>
        <div class="details">
                <span id="year">Year : ${movieData.Year}</span>
                <span>Duration : ${movieData.Runtime || noDatamsg}</span>  
        </div>
      `;
      if (movieData.imdbID) {
        const cast = document.createElement('h3');
        cast.textContent = 'Cast : ';
        const castList = document.createElement('p');
        castList.textContent = movieData.Actors || noDatamsg;
        movieDiv.appendChild(cast);
        movieDiv.appendChild(castList);
      } 
      movieList.appendChild(movieDiv);
      });
    });
  })
  .catch((error) => {
    const errorMessage = document.createElement('h3');
    errorMessage.textContent = `Error: ${error.message}`;
    const moviesList = document.getElementById('result');
    moviesList.innerHTML = '';
    moviesList.appendChild(errorMessage);
  });
    }
}
movieNameRef.addEventListener('input', getMovie);
}