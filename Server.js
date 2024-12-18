const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const supabaseUrl = 'https://jazruzbcofsyekbxcfvv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphenJ1emJjb2ZzeWVrYnhjZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MzIxMTAsImV4cCI6MjA0OTUwODExMH0.lT9hXb9uyaq0fjJb7PML92z7zzQyO9j1PhdxI8UVAnc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'INST377_Final_Index.html'));
});

// Endpoint to save word search query to Supabase
app.post('/api/search-history', async (req, res) => {
  const { search_query } = req.body;

  if (!search_query) {
    return res.status(400).json({ error: 'search_query is required.' });
  }

  try {
    const { data, error } = await supabase
      .from('search_history')
      .insert([{ search_query }]);

    if (error) {
      console.error('Error saving to database:', error.message);
      return res.status(500).json({ error: 'Failed to save to database' });
    }

    console.log(`Word "${search_query}" saved to database`);
    res.status(201).json({ message: 'Word saved successfully', data });
  } catch (err) {
    console.error('Unexpected error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Endpoint to fetch search history
app.get('/api/search-history', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('search_history')
      .select('search_query, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching history:', error.message);
      return res.status(500).json({ error: 'Failed to fetch search history' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Unexpected error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Handle invalid routes (404)
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});


