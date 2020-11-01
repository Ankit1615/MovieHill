$(document).ready( () => {    
    $('#searchform').on('submit', (e) => {
        const searchtext = $('#searchtext').val();
        getMovies(searchtext);    
        getMoviesdb(searchtext); 
        document.getElementById('tra').style.cssText ='display:block'  ;   
        e.preventDefault();       
    });        
 
        getNewest();
        index_db();
        upcoming();
        upcoming_html();
        getMoviesdb('home'); 
      

 
 
    });
 
 
 function getNewest(){
    axios.get('https://api.gdriveplayer.us/v1/movie/newest')
    .then( (response) => {
        console.log(response);

        let movies = response.data;
        let output = '';
        $.each(movies, (index,movie) => {
            output +=`
            <div class="col-md-6 col-6 col-sm-6 col-lg-4 col-xl-3">            
            <div class="well text-center jumbotron">
            <img src="${movie.poster}" >
            <h5>${movie.title}</h5>
            <a onclick="movieselected('${movie.imdb}')" class="btn btn-primary" href="#">movie details</a>
            </div>
            </div>
            `;
        }) ;       

        $('#new').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}




function movieselected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'index2.html';
    return false;
    
    }




function getMovie1(){
    let movieId = sessionStorage.getItem('movieId');
     var search =  sessionStorage.getItem('searchinput');

    axios.get('https://www.omdbapi.com/?apikey=430a333d&i='+movieId)
    .then( (response) => {
        console.log(response);               
        let movie = response.data;
        let output = `
        <div class="row">
         <div class="col-md-4">
        <img src="${movie.Poster}" class="jumbotron">      
            
         </div>         
         <div class="col-md-8 jumbotron">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
            <li class="list-group-item"><strong class="text-white">Released : </strong>${movie.Released}</li>
            <li class="list-group-item"><strong class="text-white">Genre : </strong>${movie.Genre}</li>
            <li class="list-group-item"><strong class="text-white">Actors : </strong>${movie.Actors}</li>                            
            <li class="list-group-item"><strong class="text-white">Director : </strong>${movie.Director}</li>  
            <li class="list-group-item"><strong class="text-white">Language : </strong>${movie.Language}</li>  
            <li class="list-group-item"><strong class="text-white">IMDB Rating : </strong>${movie.imdbRating}</li>  
            <li class="list-group-item"><strong class="text-white">imdbVotes : </strong>${movie.imdbVotes}</li>  
            <li class="list-group-item"><strong class="text-white">Plot : </strong>${movie.Plot}</li> 
        </ul>  <br>
        <div class="dbtn">
        <a href="https://skymovieshd.art/search.php?search=${search}&cat=All"  target="_blank" class="btn btn-primary ">Download</a> 
        <a href="https://database.gdriveplayer.us/player.php?imdb=${movie.imdbID}"  target="_blank" class="btn btn-primary" download>Watch Online</a>             
        <a href="index.html" class="btn btn-primary">Back</a>
        </div>
         </div>         
         </div>
        `;
        $('#movie').html(output);    
    })
    .catch((err) => {
        console.log(err);
    });

}





function getMovies(searchtext){
     axios.get('https://www.omdbapi.com/?apikey=430a333d&s='+searchtext)
     .then( (response) => {
        console.log(response);

        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index,movie) => {
            output +=`
            <div class="col-md-6 col-6 col-sm-6 col-lg-4 col-xl-3">            
            <div class="well text-center jumbotron">           
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onclick="movieselected('${movie.imdbID}')" class="btn btn-primary" href="#">movie details</a>            
            </div>
            </div>
            `;
        }) ; 

        $('#movies').html(output);
    })
    .catch((err) => { 
        console.log(err);
    });
}





function getMoviesdb(searchtext){

    searcht(searchtext);
   
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=db5f3460d154b331ad830bd38e3ceff0&query='+searchtext)

    .then( (response) => {
        console.log('response',response);
        let image_url = 'https://image.tmdb.org/t/p/w500';    
        let movie = response.data.results;
        let output = '';       
        $.each(movie, (index,moviedb) => {

              output +=`          
                <div class="col-md-6 col-6 col-sm-6 col-lg-4 col-xl-3">                      
                <div class="well text-center jumbotron">           
                <img src="${image_url + moviedb.poster_path}">
                <h5>${moviedb.original_title}</h5>
                <a onclick="movieselecteddb('${moviedb.id}')" class="btn btn-primary" href="#">movie details</a>            
                </div>
                </div>
                `;

                $('#Trailer').html(output);
        })

    })
                .catch((err) => {
                    console.log(err);
                });
        }
            


        function movieselecteddb(id){
            sessionStorage.setItem('movieId',id);
            window.location = 'index_db.html';
            return false;
            
            }
        
    



        function searcht(search){

            sessionStorage.setItem('searchinput',search);            
            return false;
        }



function index_db(){      
    var search =  sessionStorage.getItem('searchinput');
    var movieid =  sessionStorage.getItem('movieId');

    axios.all([
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=db5f3460d154b331ad830bd38e3ceff0&query='+search),
        axios.get('https://api.themoviedb.org/3/movie/'+ movieid +'/videos?api_key=db5f3460d154b331ad830bd38e3ceff0')
      ])
      .then(axios.spread((pres, vres) => {
        console.log(pres); 
        console.log(vres);            
        const image_url = 'https://image.tmdb.org/t/p/w500';   
        
        let element = pres.data.results;   
        let videos = vres.data.results[0];

        for(let i=0; i<element.length; i++)
        {
            if(movieid == element[i].id) {             

        let output = `
        <div class="row">
         <div class="col-md-4" >
         <img src="${image_url + element[i].poster_path}"  class="jumbotron">
         </div>         
         <div class="col-md-8 jumbotron">
        <h2>${element[i].original_title}</h2>
        <ul class="list-group">
            <li class="list-group-item"><strong class="text-white">Released : </strong>${element[i].release_date}</li>            
            <li class="list-group-item"><strong class="text-white">Popularity : </strong>${element[i].popularity}</li>                                         
            <li class="list-group-item"><strong class="text-white">Language : </strong>${element[i].original_language}</li>  
            <li class="list-group-item"><strong class="text-white">IMDB Rating : </strong>${element[i].vote_average}</li>  
            <li class="list-group-item"><strong class="text-white">imdbVotes : </strong>${element[i].vote_count}</li>  
            <li class="list-group-item"><strong class="text-white">Plot : </strong>${element[i].overview}</li> 
        </ul>  <br>
        <div class="dbtn">
 
        <a href="https://www.youtube.com/embed/${videos.key}"  target="_blank" class="btn btn-primary" download>Watch Trailer</a>             
        <a href="index.html" class="btn btn-primary">Back</a>
        </div>
         </div>         
         </div>
        `;

     
        $('#movie').html(output);    
            }
        }
    }))
    .catch((err) => {
        console.log(err);
    });

}



function upcoming(){

    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=db5f3460d154b331ad830bd38e3ceff0')

    .then( (response) => {
        console.log('upcoming',response);
        let image_url = 'https://image.tmdb.org/t/p/w500';    
        let movie = response.data.results;
        let output = '';
        $.each(movie,(index,moviedb) =>{
            output += `           
            <div class="col-md-6 col-6 col-sm-6 col-lg-4 col-xl-3">                      
                <div class="well text-center jumbotron">           
                <img src="${image_url + moviedb.poster_path}">
                <h5>${moviedb.original_title}</h5>
                <a onclick="movieselecteddb('${moviedb.id}')" class="btn btn-primary" href="#">movie details</a>            
                </div>
                </div>            
            `
            $('#Upcoming').html(output);

        })
    })
    .catch((err) => {
        console.log(err);
    });

}

function upcomingId(id){

    sessionStorage.setItem('movieId',id);
    window.location = 'upcoming.html';
    return false;

}





function upcoming_html(){
   
    var movieid =  sessionStorage.getItem('movieId');
    axios.all([
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=db5f3460d154b331ad830bd38e3ceff0'),
        axios.get('https://api.themoviedb.org/3/movie/'+ movieid +'/videos?api_key=db5f3460d154b331ad830bd38e3ceff0')
      ])
      .then(axios.spread((pres, vres) => {
        console.log(pres); 
        console.log(vres);            
        const image_url = 'https://image.tmdb.org/t/p/w500'
        let videos = vres.data.results[0];

        let element = pres.data.results;   
       

        for(let i=0; i<element.length; i++)
        {
            if(movieid == element[i].id) {             

        let output = `
        <div class="row">
         <div class="col-md-4" >
         <img src="${image_url + element[i].poster_path}"  class="jumbotron">
         </div>         
         <div class="col-md-8 jumbotron">
        <h2>${element[i].original_title}</h2>
        <ul class="list-group">
            <li class="list-group-item"><strong class="text-white">Released : </strong>${element[i].release_date}</li>            
            <li class="list-group-item"><strong class="text-white">Popularity : </strong>${element[i].popularity}</li>                                         
            <li class="list-group-item"><strong class="text-white">Language : </strong>${element[i].original_language}</li>  
            <li class="list-group-item"><strong class="text-white">IMDB Rating : </strong>${element[i].vote_average}</li>  
            <li class="list-group-item"><strong class="text-white">imdbVotes : </strong>${element[i].vote_count}</li>  
            <li class="list-group-item"><strong class="text-white">Plot : </strong>${element[i].overview}</li> 
        </ul>  <br>
        <div class="dbtn">
        <a href="https://www.youtube.com/embed/${videos.key}"  target="_blank" class="btn btn-primary">Watch Trailer</a>             
        <a href="index.html" class="btn btn-primary">Back</a>
        </div>
         </div>         
         </div>
        `;

     
        $('#movie').html(output);    
            }
        }
    }))
    .catch((err) => {
        console.log(err);
    });

}

