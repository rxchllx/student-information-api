When I send this request, my API client (like Postman) constructs an HTTP GET message and sends it to my local Express server. The server receives the request and funnels it through the global middleware stack, which logs the request and parses any incoming headers. Express then evaluates the HTTP method and URL against my defined routes top-to-bottom, successfully matching the parameter-based route for individual students. The specific route handler executes, pulls the requested student record from my array or database, packages it into an HTTP response with a 200 OK status, and transmits it back across the network to my client.

GET /students/5 Breakdown

1.Client & Target: I used Postman (or Thunder Client) to send an HTTP GET request to the path /students/5.
2.Middleware Execution: The request first hits my global logger middleware (which prints the GET and path to the console), followed by express.json() (which checks for a JSON payload, though it skips parsing here since GET requests don't have a body).
3.Route Matching: It matches the registered route app.get('/students/:id'). Express routes it here because the HTTP method is exactly GET, and the URL structure perfectly matches the /students/ base path followed by a single dynamic segment.
4.Parameter Extraction: The server reads the ID using the req.params.id property. The value is "5", and it is inherently read as text (String) since URL paths are just strings.
5.The Response: The actual response status is 200 OK, returning a JSON body like { "id": 5, "name": "Ada Lovelace", "course": "BSIT" }. The response is finalized and sent by the statement res.status(200).json(student);.
6.Bypassing the 404: The 404 fallback middleware sits at the very bottom of my app.js file. Because my route handler successfully calls res.json(), the request-response cycle completes instantly, and Express never calls next() to pass execution down to the 404 block.

T10 Invalid POST Trace

When I send the invalid POST request, the express.json() middleware intercepts it first, parses the incoming raw JSON string, and attaches the resulting object to req.body. Once inside my app.post('/students') route handler, my validation logic (e.g., if (!req.body.name || !req.body.course)) immediately detects that required fields are undefined. This triggers an early return statement that fires res.status(400).json({ error: "Missing required fields" }), completely terminating the function before it can reach the database insertion and success response code.