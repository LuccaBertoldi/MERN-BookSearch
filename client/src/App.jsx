import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient'; // Adjust the path as needed
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom'; // Use Outlet for nested routes
import Login from './components/LoginForm';
import Signup from './components/SignupForm';

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <main>
        <Outlet /> 
      </main>
    </ApolloProvider>
  );
}

export default App;
