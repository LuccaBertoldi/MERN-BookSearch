const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas'); // Adjust this path as needed
const { authMiddleware } = require('./utils/auth'); // Import your authentication middleware

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());
// Middleware for Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Attach the auth middleware
});

// Function to start the server
const startServer = async () => {
  // Start Apollo Server
  await server.start();
  
  // Apply Apollo GraphQL middleware to the Express app
  server.applyMiddleware({ app });

  // If we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Use existing routes
  app.use(routes);

  // Connect to the database and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the function to start the server
startServer();
