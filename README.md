# URL Shortner
An URL shortnening service API created in Node.js

## Follow the below steps to start the project
### 1. Clone the project from github

```
git clone https:github.com
```

### 2. Install Project Dependencies

```
npm install
```

### 3. Create `.env` file in root and paste the following

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost/url_shortner
```
You need to change `MONGODB_URI` as per your MongoDB setup.

### 4. Start the project
``` 
npm start 
```

### 5. Run Tests
```
npm run test
```

# Guides
1. Navigate to `http://localhost:3000`. Paste the long URL into text box and the click on `SHORTEN` button to get the short URL.

2. Click on the short URL and it will redirect to the original URL.

3. Go to `http://localhost:3000/stats` to get analytics.

4. If the short URL is created before 30 days, on click the URL it will show `The link has expired` message.

