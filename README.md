# Blueprint Take Home Assessment

## Technologies Used

Front-End: React

Back-End: Node, Express

## Deploying Locally

### Starting Backend

- Clone this repository to your local machine
- Navigate to the server directory `/server` and install the dependencies by running:

```bash
npm install
```

- Be sure to create a .env file in the root of the server folder using the .env.example file as a guide.
- To start the server run the following command:

```bash
npm start
```

### Starting Frontend

- Keeping the server terminal open, open a second terminal and navigate to the client directory `/client` and install the dependencies by running:

```bash
npm install
```

- \*\*Note: if your server is listening on a different port than 8000, you will need to update the proxy field in `/client/package.json` to reflect what port your server is listening on

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:8000"  <--------
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

- Once the dependencies are installed, you can start the app by running the following command in the frontend terminal:

```bash
npm start
```

- This should automatically open your browser to [http://localhost:3000](http://localhost:3000)

## Part I: Building a Small API

## API Routes

### GET Survey

Gets the survey details

- Request
  - Method: GET
  - URL: /api/survey
  - Body: none
- Successful Response:
  - Status Code: 200
  * Headers:
    - Content-Type: application/json
  * Body:

```json
{
  "id": "abcd-123",
  "name": "BPDS",
  "disorder": "Cross-Cutting",
  "content": {
    "sections": [
      {
        "type": "standard",
        "title": "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
        "answers": [
          {
            "title": "Not at all",
            "value": 0
          },
          {
            "title": "Rare, less than a day or two",
            "value": 1
          },
          {
            "title": "Several days",
            "value": 2
          },
          {
            "title": "More than half the days",
            "value": 3
          },
          {
            "title": "Nearly every day",
            "value": 4
          }
        ],
        "questions": [
          {
            "question_id": "question_a",
            "title": "Little interest or pleasure in doing things?"
          },
          {
            "question_id": "question_b",
            "title": "Feeling down, depressed, or hopeless?"
          },
          {
            "question_id": "question_c",
            "title": "Sleeping less than usual, but still have a lot of energy?"
          },
          {
            "question_id": "question_d",
            "title": "Starting lots more projects than usual or doing more risky things than usual?"
          },
          {
            "question_id": "question_e",
            "title": "Feeling nervous, anxious, frightened, worried, or on edge?"
          },
          {
            "question_id": "question_f",
            "title": "Feeling panic or being frightened?"
          },
          {
            "question_id": "question_g",
            "title": "Avoiding situations that make you feel anxious?"
          },
          {
            "question_id": "question_h",
            "title": "Drinking at least 4 drinks of any kind of alcohol in a single day?"
          }
        ]
      }
    ],
    "display_name": "BDS"
  },
  "full_name": "Blueprint Diagnostic Screener"
}
```

### POST Survey Responses

Processes survey responses and returns recommended level 2 assessments

- Request
  - Method: POST
  - URL: /api/survey
  - Headers:
    - Content-Type: application/json
  - Body:

```json
{
  "answers": [
    {
      "value": 1,
      "question_id": "question_a"
    },
    {
      "value": 0,
      "question_id": "question_b"
    },
    {
      "value": 2,
      "question_id": "question_c"
    },
    {
      "value": 3,
      "question_id": "question_d"
    },
    {
      "value": 1,
      "question_id": "question_e"
    },
    {
      "value": 0,
      "question_id": "question_f"
    },
    {
      "value": 1,
      "question_id": "question_g"
    },
    {
      "value": 0,
      "question_id": "question_h"
    }
  ]
}
```

- Successful Response:
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

```json
["ASRM", "PHQ-9"]
```

- Error Response: Body Validation Errors
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

```json
{
  "message": "Invalid Responses",
  "statusCode": 400
}
```
