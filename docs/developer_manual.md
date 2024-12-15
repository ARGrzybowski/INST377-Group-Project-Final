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

```plaintext
INST377-Group-Project-Final/
├── public/                  # Static assets and frontend files
│   ├── INST377_Final_Index.html    # Home page
│   ├── INST377_Final_Search.html   # Search page
│   ├── INST377_Final_History.html  # Search history page
│   ├── INST377_Final_About.html    # About page
│   ├── INST377_Final_Contact.html  # Contact page
│   ├── INST377_Final.css           # Styling for all pages
│   ├── INST377_Final_Index.js      # JS logic for the home page
│   ├── INST377_Final_Search.js     # JS for search functionality
│   ├── INST377_Final_History.js    # JS for displaying search history
├── Server.js                # Backend API routes and server
├── package.json             # Dependencies and project configuration
├── package-lock.json        # Dependency lock file
├── vercel.json              # Configuration for Vercel deployment
├── README.md                # Documentation
└── .gitignore               # Ignored files
```

## **API Documentation**

### Base URL
- **Localhost**: `http://localhost:3000`
- **Deployed**: `https://inst-377-group-project-final.vercel.app/`

### **Endpoints**

#### 1. **GET `/api/search-history`**
- **Description**: Retrieves the search history from the Supabase database.
- **Response**: Returns an array of search queries along with their timestamps, ordered by the most recent.
- **Example Request**:
  ```
  GET /api/search-history
  ```
- **Example Response**:
  ```json
  [
    {
      "search_query": "example",
      "created_at": "2024-12-14T10:30:00Z"
    },
    {
      "search_query": "test",
      "created_at": "2024-12-14T09:20:00Z"
    }
  ]

- **Notes**: Returns `500 Internal Server Error` if there’s an issue retrieving data from the database.

#### 2. **POST `/api/search-history`**
- **Description**: Saves a word search query to the Supabase database.
- **Request Body**:
  ```json
  {
    "search_query": "example"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Word saved successfully",
      "data": [
        {
          "id": 1,
          "search_query": "example",
          "created_at": "2024-12-14T10:45:00Z"
        }
      ]
    }
  - **Error**:
    - **400 Bad Request**: If `search_query` is missing.
    - **500 Internal Server Error**: If there’s a database issue.
- **Notes**: Ensure the request includes a `search_query` key.


#### 3. **404 Error Handling**
- **Description**: Handles all invalid routes not matching existing endpoints.
- **Response**: Returns a plain text message.
  

## **Notes for Future Development**
1. Add more endpoints as required, such as `DELETE` or `PATCH` for search history.
2. Integrate user-specific search histories (e.g., based on authentication).

Let me know if you need additional formatting or want help documenting future endpoints!


## Future Improvements
- Add user authentication to personalize search history.
- Implement additional features such as favorites/bookmarks.
- Enhance UI/UX with animations and improved styling.

## Credits
- Developed by **Justin Flores, Andrew Grzybowski, Jonathan Evans**
- API Provider: [Free Dictionary API](https://dictionaryapi.dev/)
- Database: [Supabase](https://supabase.com/)


