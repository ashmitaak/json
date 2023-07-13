const addMovieForm = document.getElementById("addMovieForm");
const movieslist = document.getElementById("movieslist");

// Fetch movies from the JSON server
async function fetchMovies() {
  try {
    const response = await fetch("http://localhost:5500/movies");
    const movies = await response.json();

    movieslist.innerHTML = ""; // Clear the movie list before adding new movies

    movies.forEach((movie) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <b>Title:</b> ${movie.title}<br>
        <b>Genre:</b> ${movie.genre}<br>
        <b>Director:</b> ${movie.director}<br>
        <b>Release Year:</b> ${movie.releaseYear}<br>
        <button onclick="editMovie(${movie.id})">Edit</button>
        <button onclick="deleteMovie(${movie.id})">Delete</button>
        <br><br>
      `;
      movieslist.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}

// Add new movie
async function addMovie(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const director = document.getElementById("director").value;
  const releaseYear = document.getElementById("releaseYear").value;

  const movie = {
    title,
    genre,
    director,
    releaseYear,
  };

  try {
    const response = await fetch("http://localhost:5500/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    const data = await response.json();
    console.log("Movie added:", data);
    fetchMovies();
  } catch (error) {
    console.log(error);
  }

  addMovieForm.reset();
}

// Edit movie
async function editMovie(id) {
  const title = prompt("Enter new title:");
  const genre = prompt("Enter new genre:");
  const director = prompt("Enter new director:");
  const releaseYear = prompt("Enter new release Year:");

  const updatedMovie = {
    title,
    genre,
    director,
    releaseYear,
  };

  try {
    const response = await fetch(`http://localhost:5500/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    const data = await response.json();
    console.log("Movie Updated:", data);
    fetchMovies();
  } catch (error) {
    console.log(error);
  }
}

// Delete movie
async function deleteMovie(id) {
  try {
    const response = await fetch(`http://localhost:5500/movies/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log("Movie Deleted:", data);
    fetchMovies();
  } catch (error) {
    console.log(error);
  }
}

// Event Listener
addMovieForm.addEventListener("submit", addMovie);

// Initial fetch
fetchMovies();

