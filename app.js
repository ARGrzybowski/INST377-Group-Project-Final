const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

const supabaseUrl = 'https://rxplgwsnlbhonbfapovw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4cGxnd3NubGJob25iZmFwb3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5Mzk2MDIsImV4cCI6MjA0OTUxNTYwMn0.2ezka0EAffBSF2Co2OHu59l9P6Md5tQ0h17xyPro-xY';


const supabase = createClient(supabaseUrl, supabaseKey);


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.get('/api/search-history', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('search_history')
            .select('*')
            .order('searched_at', { ascending: false });
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching search history:', error);
        res.status(500).send('Failed to fetch search history');
    }
});


app.post('/api/save-search', async (req, res) => {
    const { searchTerm } = req.body;
    try {
        const { data, error } = await supabase
            .from('search_history')
            .insert([{ search_term: searchTerm }]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Error saving search term:', error);
        res.status(500).send('Failed to save search term');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
