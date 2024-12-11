const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());

const supabaseUrl = 'https://rxplgwsnlbhonbfapovw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4cGxnd3NubGJob25iZmFwb3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5Mzk2MDIsImV4cCI6MjA0OTUxNTYwMn0.2ezka0EAffBSF2Co2OHu59l9P6Md5tQ0h17xyPro-xY';
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/api/search-history', async (req, res) => {
    const { search_term } = req.body;

    if (!search_term) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const { data, error } = await supabase
            .from('search_history')
            .insert([{ search_term }]);

        if (error) {
            console.error('Error saving search term:', error);
            return res.status(500).json({ error: 'Failed to save search term' });
        }

        res.status(201).json({ message: 'Search term saved successfully', data });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

app.get('/api/search-history', async (req, res) => {
    try {
        // Fetch all search terms from the 'search_history' table
        const { data, error } = await supabase
            .from('search_history')
            .select('*')
            .order('searched_at', { ascending: false });

        if (error) {
            console.error('Error fetching search history:', error);
            return res.status(500).json({ error: 'Failed to fetch search history' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

