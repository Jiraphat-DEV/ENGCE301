## Lab4 Reactjs (Front-end) - งานเพิ่ม Movies

นำ Lab 3 มาใช้งานเป็น back-end

![image-25670731201815577](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731201815577.png)

ทดสอบการทำงานของ API

![image-25670731201957122](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731201957122.png)

และนำ UI ของ lab 1 มาใช้งานเป็น front-end

![image-25670731201842316](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731201842316.png)

แก้ไข package.json แก้ปัญหาในการทำงานเรื่อง version ของ nodejs ทั้งการ start และ build

```json
"scripts": {
  "start": "export PORT=4000 && react-scripts --openssl-legacy-provider start",
  "build": "react-scripts --openssl-legacy-provider build",
  ....
},
```

เพิ่มไฟล์ `frontend/src/components/Movies.js`

```javascript
import React from 'react'

export const Movies = ({movies}) => {

    console.log('movies length:::', movies.length)
    if (movies.length === 0) return null

    const MovieRow = (movie,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.director}</td>
                  <td>{movie.release_year}</td>
              </tr>
          )
    }

    const movieTable = movies.map((movie,index) => MovieRow(movie,index))

    return(
        <div className="container">
            <h2>Movies</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Movie Id</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Director</th>
                    <th>Release</th>
                </tr>
                </thead>
                <tbody>
                    {movieTable}
                </tbody>
            </table>
        </div>
    )
}
```

เพิ่มไฟล์ `frontend/src/components/CreateMovie.js`

```javascript
import React from 'react'


const CreateMovie = ({onChangeForm, createMovie }) => {


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Create Movie</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">Title</label>
                            <input type="text" onChange={(e) => onChangeForm(e)}  className="form-control" name="title" id="title" placeholder="Title" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputPassword1">Genre</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="genre" id="genre" placeholder="Genre" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">Director</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="director" id="director" placeholder="Director" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">Release</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="release_year" id="release_year" placeholder="Release" />
                        </div>
                    </div>
                    <button type="button" onClick= {(e) => createMovie()} className="btn btn-danger">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMovie
```

เพิ่มไฟล์ `frontend/src/components/SearchMovie.js`

```javascript
import React from 'react'


const SearchMovie = ({onChangeForm, searchMovie }) => {


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Search Movie</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="director" id="director" placeholder="Director" />
                        </div>

                    </div>
                    <button type="button" onClick= {(e) => searchMovie()} className="btn btn-danger">Search</button>
                </form>
                </div>
            </div>

        </div>
    )
}

export default SearchMovie
```

แก้ไขไฟล์ `frontend/src/components/DisplayBoard.js`

```javascript
import React from 'react'

export const DisplayBoard = ({numberOfMovies, getAllMovies}) => {

    const headerStyle = {

        width: '100%',
        padding: '2%',
        backgroundColor: "red",
        color: 'white',
        textAlign: 'center'
    }
    
    return(
        <div style={{backgroundColor:'green'}} className="display-board">
            <h4 style={{color: 'white'}}>Movies Created</h4>
            <div className="number">
            {numberOfMovies}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => getAllMovies()} className="btn btn-warning">Get all Movies</button>
            </div>
        </div>
    )
}
```

เพิ่มไฟล์ `frontend/src/services/MovieService.js`

```javascript
export async function searchMovie(search_data) {

    try {

        console.log('search_data: ' + search_data);

        const response = await fetch('http://localhost:3001/api/movie/search?search_text=' + search_data);

        return await response.json(); //***

        // console.log('Search Movie response: ' + await response);

    } catch (error) {
        return [];
    }

}

export async function getAllMovies() {

    try{
        //const response = await fetch('/api/users');
         const response = await fetch('http://localhost:3001/api/movie/all');
        //const response = await fetch('/api/movie/all');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

//---- ยังไม่เสร็จ ----
export async function createMovie(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}

```

ปรับปรุง App.js

```javascript
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { DisplayBoard } from './components/DisplayBoard'

//----------------
import { Movies } from './components/Movies'
import CreateMovie from './components/CreateMovie'
import SearchMovie from './components/SearchMovie'
import { getAllMovies, createMovie, searchMovie } from './services/MovieService'

function App() {

  //--------------
  const [search_data, setSearch_data] = useState({})
  const [movie, setMovie] = useState({})
  const [movies, setMovies] = useState([])
  const [numberOfMovies, setNumberOfMovies] = useState(0)

  const movieCreate = (e) => {

    createMovie(movie)
      .then(response => {
        console.log(response);
        setNumberOfMovies(numberOfMovies + 1)
      });

    fetchAllMovies(); /* */
  }


  const movieSearch = (e) => {
    
    console.log(search_data.search_text);

    searchMovie("jok")
      .then(movies => {
        console.log(movies.data);
        setMovies(movies.data);
        setNumberOfMovies(movies.data.length);

      });

  }
  const fetchAllMovies = () => {
    getAllMovies()
      .then(movies => {
        console.log(movies);
        setMovies(movies);
        setNumberOfMovies(movies.length);
      });
  }


  useEffect(() => {

    getAllMovies()
      .then(movies => {
        console.log(movies)
        setMovies(movies);
        setNumberOfMovies(movies.length)
      });
      

  }, [])

  const onChangeForm = (e) => {
    if (e.target.name === 'title') {
      movie.title = e.target.value;
    } else if (e.target.name === 'genre') {
      movie.genre = e.target.value;
    } else if (e.target.name === 'director') {
      movie.director = e.target.value;
    } else if (e.target.name === 'release_year') {
      movie.release_year = e.target.value;
    }
    setMovie(movie)
  }


  const onChangeForm2 = (e) => {
    if (e.target.name === 'search_text') {
      search_data.search_text = e.target.value;
    } 
    setSearch_data(search_data)
  }


  return (
    <div className="App">
      <Header></Header>
      <div className="container mrgnbtm">
        <div className="row">
          <div className="col-md-8">
            <CreateMovie
              // user={user}
              movie={movie}
              onChangeForm={onChangeForm}
              createMovie={movieCreate}
            >
            </CreateMovie>
          </div>
          <div className="col-md-4">
            <DisplayBoard
              numberOfMovies={numberOfMovies}
              getAllMovies={fetchAllMovies}
            >
            </DisplayBoard>
          </div>
        </div>
      </div>
      <div className="row mrgnbtm">

          <SearchMovie
              // user={user}
              movie={movie}
              onChangeForm={onChangeForm}
              searchMovie={movieSearch}
            >
          </SearchMovie>

        {/* <SearchBoard
          // user={user}
          search_data={search_data}
          onChangeForm2={onChangeForm2}
          searchMovies={searchMovie}
        >
        </SearchBoard> */}

      </div>
      <div className="row mrgnbtm">
        <Movies movies={movies}></Movies>
      </div>

    </div>
  );
}

export default App;
```

รันคำสั้ง 

```shell
npm start
```

![image-25670731203246481](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731203246481.png)



รันคำสั้ง 

```shell
npm run build
```

![image-25670731204922965](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731204922965.png)

**เพิ่มเติม**

สร้าง function ให้ครบ search data, insert data, delete data

แก้ไขการค้นหา ==search data==

​	แก้ไขให้ใช้ `search_data.search_text` []

```javascript
const movieSearch = (e) => {
    
    console.log(search_data.search_text);

    // searchMovie("jok")
    searchMovie(search_data.search_text)
      .then(movies => {
        console.log(movies.data);
        setMovies(movies.data);
        setNumberOfMovies(movies.data.length);
      });
  }
```

​	แก้ไขให้ใช้ onChangeForm2 แทน onChangeForm

```javascript
...
function App() {

  //--------------
  ..

  const onChangeForm = (e) => {
    if (e.target.name === 'title') {
      movie.title = e.target.value;
    } else if (e.target.name === 'genre') {
      movie.genre = e.target.value;
    } else if (e.target.name === 'director') {
      movie.director = e.target.value;
    } else if (e.target.name === 'release_year') {
      movie.release_year = e.target.value;
    }
    setMovie(movie)
  }


  const onChangeForm2 = (e) => {
    // console.log("TEST ", e.target.name)
    if (e.target.name === 'search_text') {
      search_data.search_text = e.target.value;
    } 
    setSearch_data(search_data)
  }


  return (
    ...

          <SearchMovie
              // user={user}
              movie={movie}
              onChangeForm={onChangeForm2}
              searchMovie={movieSearch}
            >
          </SearchMovie>

        ...

export default App;

```

​	แก้ไขการตั้งค่าชื่อ name จาก dirctor เป็น search_text

```javascript
import React from 'react'
const SearchMovie = ({onChangeForm, searchMovie }) => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Search Movie</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="search_text" id="search_text" placeholder="movie name" />
                        </div>

                    </div>
                    <button type="button" onClick= {(e) => searchMovie("test")} className="btn btn-danger">Search</button>
                </form>
                </div>
            </div>

        </div>
    )
}

export default SearchMovie
```

ผลการทดลอง

![image-25670731223752500](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731223752500.png)

![image-25670731223810937](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731223810937.png)

แก้ไขการแทรกข้อมูล ==insert data==

​	เขียน function ในการสร้างข้อมูลเพื่อไป insert ใน DB ให้ถูกต้อง [`frontend/src/services/MovieService.js`]

```javascript
// insert
export async function createMovie(data) {
    console.log("vreate test", data)
    const response = await fetch('http://localhost:3001/api/movie/insert', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: data.title,
            genre: data.genre,
            director: data.director,
            release_year: data.release_year
        })
      })
    return await response.json();
}
```

​	ผลการทดลอง

![image-25670731225920737](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731225920737.png)

เพิ่มการลบข้อมูล ==delete data==

​	สร้างไฟล์ `frontend/src/components/DeleteMovie.js`

```javascript
import React from 'react'


const DeleteMovie = ({onChangeForm, deleteMovie }) => {


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Delete Movie</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="delete_text" id="delete_text" placeholder="movie name" />
                        </div>

                    </div>
                    <button type="button" onClick= {(e) => deleteMovie("test")} className="btn btn-danger">Delete</button>
                </form>
                </div>
            </div>

        </div>
    )
}

export default DeleteMovie
```

​	เพิ่ม function movieDelete และ onChangeForm3 ใน `App.js`

```javascript
...

//----------------
...
import DeleteMovie from './components/DeleteMovie';
import { getAllMovies, createMovie, searchMovie, deleteMovie} from './services/MovieService'

function App() {

  //--------------
  ...
  const [delete_data, setDelete_data] = useState({})

  ...
  
  const movieDelete = (e) => {
    console.log("delete_data: ", delete_data.delete_text);
  
    deleteMovie(delete_data.delete_text)
      .then(movies => {
        console.log("delete data : ", movies?.data);
  
        if (movies && movies.data) {
          setMovies(movies.data);
          setNumberOfMovies(movies.data.length);
        } else {
          setMovies([]);
          setNumberOfMovies(0);
        }
      })
      .catch(error => {
        console.error("Error deleting movie: ", error);
        setMovies([]);
        setNumberOfMovies(0);
      });
  }
...
  const onChangeForm3 = (e) => {
    // console.log("TEST", e.target.name);
    if (e.target.name === 'delete_text') {
      delete_data.delete_text = e.target.value;
    }
    setDelete_data(delete_data)
  }


    return (
      <div className="App">
        <Header></Header>
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
              <CreateMovie
                // user={user}
                movie={movie}
                onChangeForm={onChangeForm}
                createMovie={movieCreate}
              >
              </CreateMovie>
            </div>
            <div className="col-md-4">
              <DisplayBoard
                numberOfMovies={numberOfMovies}
                getAllMovies={fetchAllMovies}
              >
              </DisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">

            <SearchMovie
                // user={user}
                movie={movie}
                onChangeForm={onChangeForm2}
                searchMovie={movieSearch}
              >
            </SearchMovie>

          <DeleteMovie
            movie={movie}
            onChangeForm={onChangeForm3}
            deleteMovie={movieDelete}>
          </DeleteMovie>

        {/* <SearchBoard
          // user={user}
          search_data={search_data}
          onChangeForm2={onChangeForm2}
          searchMovies={searchMovie}
        >
        </SearchBoard> */}

      </div>
      <div className="row mrgnbtm">
        <Movies movies={movies}></Movies>
      </div>

    </div>
  );
}
export default App;

```

​	เพิ่ม function เชื่อมต่อกับ back-end ในการ delete ในไฟล์ [`frontend/src/services/MovieService.js`]

```javascript
...

export async function deleteMovie(delete_data) {
    try {
        console.log('delete_data: ' + delete_data);
        const response = await fetch('http://localhost:3001/api/movie/delete?search_text=' + delete_data);
        // console.log('Delete Movie response: ' + await response);
        return await response.json(); //***
    } catch (error) {
        return [];
    }
}
...
```

​	ผลการทดลอง

![image-25670731235626992](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731235626992.png)

​	หลังกดปุ่ม delete

![image-25670731235641445](/Users/jiraphat/Library/Application Support/typora-user-images/image-25670731235641445.png)



code เต็มอยู่ใน GitHub 
