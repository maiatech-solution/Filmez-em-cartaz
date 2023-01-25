import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  type Movie = {
    titulo: string,
    avatar: string
  }

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, [])

  const loadMovies = async () => {
    try{

      setLoading(true);
      let response = await axios.get('https://api.b7web.com.br/cinema/');
      setLoading(false);
      return setMovies(response.data);
    } catch{
      setLoading(false);
    }
  }

  return (
    <div className="container_movies w-full p-4">
      {loading &&
        <p>Carregando ...</p>
      }

      {!loading && movies.length > 0 &&
        <>
          <h1 className='text-white text-center p-4 border-b-2 text-xl font-bold'>FILMES EM CARTAZ</h1>
          <h3 className='text-green-400 text-end p-4 '>Total de filmes: {movies.length}</h3>
          <div className='grid grid-cols-6 gap-3'>
            {movies.map((item, index) => (
              <div className='flex flex-col justify-center items-center border p-4 rounded-md'>
                <img src={item.avatar} className="w-32 mb-2" alt="cartaz do filme" />
                <span className='text-white'>{item.titulo}</span>
              </div>
            ))}
          </div>
        </>
      }

      {!loading && movies.length === 0 &&
        <div>Tente novamente mais tarde</div>
      }

    </div>
  );
}

export default App
