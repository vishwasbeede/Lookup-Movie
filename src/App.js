// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Default from './components/Default';
import Home from './components/Home';
import MovieFilters from './components/MovieFilters';
import Movies from './components/Movies';
import Notfound from './components/Notfound';


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} Router />
        <Route path="/search/:id" element={<Default />} />
        <Route path="/search" element={<Default />} />
        {/* <Route path="/details/:id" element={<MovieDetails />} /> */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/test" element={<MovieFilters />} />
        <Route path="*" element={<Notfound />} />
        <Route path='/test-1' element={<Default />} />
      </Routes>
    </Router>
  );
}

export default App;
