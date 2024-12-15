# INST377-Group-Project-Final

## Project Title
**Word Lord**

## Project Description
Our group has constructed a web app that allows users to quickly and easily look up words they are unfamiliar with to get pronunciations, definitions, types of speech, and example usages in sentences. The app stores search history, allowing users to view previous words they searched. 

### Features:
- **Search Functionality:** Users can search for a word and retrieve its pronunciation, definitions, part of speech, and example sentences using the [Free Dictionary API](https://dictionaryapi.dev/).
- **Search History:** A dedicated page where users can see a list of previous words they searched, saved in a Supabase database.
- **About Page:** A simple page that provides an overview of the web app and how it works.
- **User-Friendly Interface:** Easy navigation across **Home**, **Search**, **About**, and **Search History** pages.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js with Express.js
- **Database:** Supabase for storing search history
- **API:** Free Dictionary API

## Target Browser
The app is designed to run on modern web browsers such as:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## How to Run the Project through Vercel
Copy and paste the link into your browser: 
https://inst-377-group-project-final.vercel.app/

## How to Run the Project Locally
Follow these steps to set up the project on your local machine:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd INST377-Group-Project-Final
   ```

2. **Install Dependencies**
   Ensure Node.js is installed, then run:
   ```bash
   npm install
   ```

3. **Run the Server**
   Start the server to serve the application:
   ```bash
   node Server.js
   ```
   - The server will run on `http://localhost:3000`

4. **Open the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Folder Structure

INST377-Group-Project-Final/
│
├── public/                         # Static assets and frontend files
│   ├── INST377_Final_Index.html    # Home page
│   ├── INST377_Final_Search.html   # Search page
│   ├── INST377_Final_History.html  # Search history page
│   ├── INST377_Final_About.html    # About page
│   ├── INST377_Final_Contact.html  # Contact page
│   ├── INST377_Final.css           # Styling for all pages
│   ├── INST377_Final_Index.js      # JS logic for the home page
│   ├── INST377_Final_Search.js     # JS for search functionality
│   ├── INST377_Final_History.js    # JS to display search history
│
├── Server.js                       # Backend API routes and server
├── app.js                          # Main entry point for backend
├── package.json                    # Dependencies and project configuration
├── package-lock.json               # Dependency lock file
├── vercel.json                     # Configuration for Vercel deployment
├── README.md                       # Documentation
└── .gitignore                      # Ignored files


## Future Improvements
- Add user authentication to personalize search history.
- Implement additional features such as favorites/bookmarks.
- Enhance UI/UX with animations and improved styling.

## Credits
- Developed by **Justin Flores, Andrew Grzybowski, Jonathan Evans**
- API Provider: [Free Dictionary API](https://dictionaryapi.dev/)
- Database: [Supabase](https://supabase.com/)

