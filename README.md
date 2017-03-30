# Postalicious

- **Name:** Monica Williams, Serafin Wesnidge
- **Github handle:** @Moniarchy, @Lumodon
- **Team name:** `rare-malleefowl`
- **JSDev link:** [Postalicious](http://jsdev.learnersguild.org/goals/194-Postalicious-Demystifying_HTTP.html)

# Installation
1. Open terminal
2. type `git clone https://github.com/Moniarchy/postalicious.git`
3. change current working directory with `cd postalicious`
4. type `npm install`
5. type `pwd | pbcopy`
6. open a second terminal tab
7. in new terminal tab type ``cd `pbpaste` ``
8. in one terminal tab type `npm run sb`
9. in the other terminal tab type `npm run pl`
10. open a browser window to `localhost:3001`
11. have fun!

# Usage (Do HTTP Stuff)

#### Sandbox HTTP API

| verb | domain and path                      |
| ---- | ------------------------------------ |
| get  | localhost:3000/                      |
| get  | localhost:3000/search                |
| post | localhost:3000/things                |
| get  | localhost:3000/somefile              |
| get  | localhost:3000/old-page              |
| post | localhost:3000/admin-only            |
| get  | localhost:3000/not-a-page            |
| get  | localhost:3000/server-error          |

These are sample endpoints to connect to, but the app can connect to any external API if you send the correct information.

To use the app, at minimum you must type the verb into the method field, type the domain and path into the host field. Query parameters, headers, and body for your request are optional. 

Click build request to see a display of your request.
Click build & send to display and send your request to the endpoint host you are trying to connect to. If you successfully connected to the endpoint, the response will show on the right hand side.

![Image of screen shot of usage example](https://github.com/Moniarchy/postalicious/raw/master/usageExample.png)

## Specifications

**General**

- [X] The artifact produced is a repo with at least two sub-folders: `postalicious/` and `sandbox-server/`.
- [X] The artifact produced is properly licensed, preferably with the [MIT license](https://opensource.org/licenses/MIT).

**Sandbox Server**

- [X] Can run the command `npm run sandbox-server` (or `npm run sb`, if you want to save some typing) to start the sandbox web server at port 3000.
- [X] The sandbox server source code is written using the [Express][express] library.
- [X] Sending a `GET` request to the path `/` responds with...
  - [X] a 200 (OK) status code
  - [X] a plain-text response body with the content `Welcome to Sandbox!`
  - [X] the `Content-Type` header set to `text/plain`
- [X] Sending a `GET` request to the path `/search?q=doodads` responds with...
  - [X] a 200 (OK) status code
  - [X] a plain-text response body with the content `You searched for: "doodads"` (it doesn't need to actually do any searching, just return the plain text)
  - [X] the `Content-Type` header set to `text/plain`
- [X] Sending a `GET` request to the path `/search` responds with...
  - [X] a 400 (Bad Request) status code
  - [X] a plain-text response body with the content `You didn't provide a search query term :(`
  - [X] the `Content-Type` header set to `text/plain`
- [X] Sending a `POST` request to the path `/things` with a plain text body `flying car` responds with...
  - [X] a 201 (Created) status code
  - [X] a plain-text response body with the content `New thing created: "flying car"!` (it doesn't need to actually create anything, just return the plain text)
  - [X] the `Content-Type` header set to `text/plain`
- [X] Sending a `GET` request to the path `/somefile` with an `Accept` header of `text/plain` responds with...
  - [X] a 200 (OK) status code
  - [X] a plain-text response body with the content `This is a plain text file`
  - [X] the `Content-Type` header set to `text/plain`
- [X] Sending a `GET` request to the path `/somefile` with an `Accept` header of `text/html` responds with...
  - [X] a 200 (OK) status code
  - [X] an HTML response body with the content `<!DOCTYPE html><html><body>This is an HTML file</body></html>`
  - [X] the `Content-Type` header set to `text/html`
- [X] Sending a `GET` request to the path `/myjsondata` with an `Accept` header of `application/json` responds with...
  - [X] a 200 (OK) status code
  - [X] an HTML response body with the content `{ "title": "some JSON data" }`
  - [X] the `Content-Type` header set to `application/json`
- [X] Sending a `GET` request to the path `/old-page` responds with...
  - [X] a 301 (Moved Permanently) status code
  - [X] the `Location` header set to `http://localhost:3000/newpage`
- [X] Sending a `POST` request to the path `/admin-only` responds with a 403 (Forbidden) status code
- [X] Sending a `GET` request to the path `/not-a-page` responds with a 404 (Not Found) status code
- [X] Sending a `GET` request to the path `/server-error` responds with a 500 (Internal Server Error) staus code

**Postalicious**

- [X] Can run the command `npm run postalicious` (or `npm run pl`, if you want to save some typing) to start the Postalicious app at port 3001.
- [X] Users can visit the main page of the Postalicious site at `http://localhost:3001`.
- [X] Main page has three main sections:
  - [X] Request builder HTML form
  - [X] Raw HTTP request
  - [X] Raw HTTP response
- [X] When a user fills out the HTML form and clicks a "Send" button...
  - [X] The raw HTTP request is generated and shown
  - [X] The HTTP request is sent, and the raw response message is shown
- [X] Users can fill out an HTML form to specify HTTP request details.
- [X] Submitting the form will send the request according to the specified details.
- [X] Requests are made from the server, not from the browser (this is to avoid [CORS issues](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)).
- [X] Using the HTML form, users can specify...
  - [X] host and path
  - [X] HTTP verb/method
  - [X] query parameter keys + values
  - [X] header keys + values
  - [X] request body

### Stretch

Use the stretch goals to go deeper into the nuts and bolts of HTTP.

- [ ] Sandbox server is written using _only the core Node.js modules_ (instead of Express, use the built-in [HTTP module][node-http]).
- [ ] Users of Postalicious can "save" their requests in a history panel
- [ ] Clicking on a saved request will re-load it into the form
- [ ] Using Postalicious, create some HTTP requests to various real-world APIs:
  - [ ] Get all issues for a repo through the GitHub API
  - [ ] Get all tweets with the hashtag `#javascript` with the Twitter API
  - [ ] Any other API request(s) of your choice
  - [ ] External HTTP requests are saved in files under a `example-requests/` directory (make sure to obscure any secure information before saving these files, like your password or authentication token)

## Quality Rubric

**Well formatted code**
- [X] Code uses a linter, which can be invoked with a command (e.g. `npm run lint`). [50 points]
[Link to ESLint results](https://github.com/Moniarchy/postalicious/blob/master/eslint_results.md)

- [X] Running the linter on all source code files generates no linting errors. [50 points]
The linting errors are due to it looking in non-javascript files, and reamining console log is error reporting.

**Clear and useful README**
- [X] Repository includes a README file with installation and setup instructions. [25 points]
- [X] Repository includes a README file with usage instructions and at least one example use case. [25 points]

**Proper dependency management**
- [X] There is a command to install dependencies (e.g. `npm install`) and it is specified in the installation and setup instructions of the README. [50 points]

**Good project management**
- [X] Commit messages are concise and descriptive. [25 points]
- [X] All features are added via pull requests. [25 points]
- [X] Every pull request has a description summarizing the changes made. [25 points]
- [X] Every pull request has been reviewed by at least one other person. [25 points]
