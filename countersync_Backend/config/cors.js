// Define options for Cross-Origin Resource Sharing (CORS)
const corsOptions={
    origin:"http://localhost:5173",  // Allowed origin (frontend URL)
    methods : "GET, POST, PUT, DELETE",   // Allowed HTTP methods
    credentials : true,  // Allow cookies and credentials to be sent
};

module.exports=corsOptions;