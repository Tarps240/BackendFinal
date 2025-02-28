import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

function App() {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err))
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <div className = 'min-hscreen bg-quaternary'>
      <nav className = 'bg-primary p-4'>
        <div className = 'container mx-auto flex justify-between items-center'>
          <h1 className = 'text-white text-2xl'>Blog App</h1>
          {user && (
            <button onClick = {logout} className = 'text-white'>
              Logout
            </button>
          )}
        </div>
      </nav>
      <main className = 'container mx-auto p-4'>
        {user ? (
          <>
            <CreatePost fetchPosts = {fetchPosts} />
            <PostList posts = {posts} />
          </>
        ) : (
          <AuthForm />
        )}
      </main>
    </div>
  );
}

export default App