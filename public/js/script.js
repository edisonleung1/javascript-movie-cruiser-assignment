const url='http://localhost:3000/';

let movieslist;

async function getMovies() {
	let result='\n';
	let moviesListPromise=await fetch(url+"movies",{
		method:'GET'
	});
	movieslist=await moviesListPromise.json();
	movieslist.forEach(movie=>{
		let div=`
		<div class="card" style="width: 18rem;" id="m+${movie.id}">
		<img src="${movie.posterPath}" class="card-img-top" alt="Movie poster">
		<div class="card-body">
		  <h5 class="card-title">${movie.title}</h5>
		  <p class="card-text">Movie id:${movie.id}</p>
		  <p class="card-text">${movie.overview}</p>
		  <a href="#" class="btn btn-primary" onclick=addFavourite(${movie.id})>Add Favourites</a>
		</div>
	  </div>`
		result=result+div;
	})
	document.getElementById("moviesList").innerHTML = result;
	return movieslist;
}

async function getFavourites() {
	let response=await fetch(url+"favourites");
	let ul=document.getElementById('favouritesList');
	let favourites=await response.json();
	favourites.forEach(favourite=>{
		var div=document.createElement('div');
		div.innerHTML=`
		<div class="card" style="width: 18rem;" id="f+${favourite.id}">
		<img src="${favourite.posterPath}" class="card-img-top" alt="...">
		<div class="card-body">
		  <h5 class="card-title">${favourite.title}</h5>
		  <p class="card-text">Movie id:${favourite.id}</p>
		  <p class="card-text">${favourite.overview}</p>
		</div>
	  </div>`
	  ul.appendChild(div);
	})
	return favourites;
	/*
	let result='\n';
	let favouriteListPromise=await fetch(url+"favourites",{
		method:'GET'
	});
	let favouriteslist=await favouriteListPromise.json();
	favouriteslist.forEach(favourite=>{
		let div=`
		<div class="card" style="width: 18rem;">
		<img src="${favourite.posterPath}" class="card-img-top" alt="...">
		<div class="card-body">
		  <h5 class="card-title">${favourite.title}</h5>
		  <p class="card-text">Movie id:${favourite.id}</p>
		  <p class="card-text">${favourite.overview}</p>
		</div>
	  </div>`
		result=result+div;
	})
	document.getElementById("favouritesList").innerHTML = result;
	return favouriteslist;
	*/
}


async function addFavourite(id) {
	let movieToBeAdded;
	movieslist.forEach(movie=>{
		if(movie.id==id){
			movieToBeAdded=movie;
		}
	})
	let favourite=document.getElementById("fid");
	if(!favourite){
		try{
			let favouritePromise=await fetch(url+"favourites",{
				method:'POST',
				headers:{
					'content-type':'application/json'
				},
				body:JSON.stringify(movieToBeAdded)
				
			})
			let data =await favouritePromise.json();
			return data;
		}catch(err){
			return (err);
		}
	}else{
		return (new Error("Movie is already added to favourites"));
	}
	
	
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite,
};



// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


