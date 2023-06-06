# Blueprint Take Home Assessment

![blueprint gif](https://github.com/NickArakaki/nick-arakaki-blueprint-take-home/assets/115119760/6bb86fcf-27f3-4669-a904-2e9de97a0511)

## Live Link

\*\*\*\*NOTE: This is hosted on a free service, as such it may take a few minutes to load

https://nick-arakaki-blueprint-take-home.onrender.com

## Developer

Nicholas Arakaki

[Portfolio](https://nickarakaki.github.io/)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Description](#project-description)
- [My Approach](#my-approach)
  - [Part I: API](#part-i-api)
  - [Part II: Frontend](#part-ii-frontend)
  - [Production](#production)
  - [Final Thoughts](#final-thoughts)
- [Deploying Locally](#deploying-locally)
- [API Routes](#api-routes)

## Technologies Used

Back-End: Node, Express

Front-End: React

Testing: Jest, Postman

## Project Description

According to the National Aliance on Mental Illness (NAMI), over 50 million people in the United States experience some form of mental illness, and less than half of them received treatment as of 2021. According to the National Health Center for Health Statistics (NCHS), the suicide rate from 2001 to 2021 saw an increase of approximately 4%. Many people are treating their mental illness by seeking out mental health care, but it's pointless unless the care is effective.

The way to improve the quality of mental health care is to use techniques and methods supported by data. One of the common tasks that clinicians will do is administer a multiple-choice questionarie to determine symptom severity for disorders like depression, anxiety, etc. Clinicians manually select and assign assessments to patients, often needing to review each assessment individually before assigning it. To help automate this process, and help the clinician provide the right care, this diagnostic screener can be presented to a patient and, based on their responses, the recommended assessments will be suggested.

[NAMI Mental Health Stats](https://www.nami.org/mhstats)

[NCHS Report](<https://www.cdc.gov/nchs/products/databriefs/db464.htm#:~:text=The%20total%20age%2Dadjusted%20suicide,the%20period%20(Figure%201).>)

## My Approach

### Part I: API

When planning how I would develop the API, I went back and forth trying to decide whether it was worth it to set up a database to store the small amount of data required for this application. I decided that was overkill for the scope of this project, and instead opted to store the survey, question/domain map, and the domain/level two test map as files the API can import as needed. I recognize that this requires a full rebuild of the app if I ever want to modify the files, and that there are inherent security risks associated with bundling the data as plain text in the application's code, however, I did not see any real harm in this approach as I am not accessing any identifiable patient information, instead simply accessing a survey returning the results based on the user responses. Please see the [API Routes](#api-routes) section for more details on the routes.

In a production application, however, I would consider using a relational or NoSQL database depending on the complexity of the data I want to store, and how I expect to use the data in the rest of my application. I would also definitely use a means of user authentication and encrypted data transfer to ensure the data is securely sent to the appropriate user since this data would almost certainly contain protected health information. The use of an ORM or ODM would be used to further secure the data from injection attacks.

I chose to use Express as the API framework as it allows me to quickly and easily setup endpoints, and through the use of middleware functions I can process the incoming requests in an organized manner. One of the downsides to Express, however, is that it's unopinionated and lacks a lot of built-in security, requiring the use of external dependencies and custom middleware to control the flow of data.

Had I spent more time on this project I would have implemented some of the security dependencies, as well as write more robust tests for my validators and data processing middlewares.

### Part II: Frontend

The frontend of this application was built using React. Using the API built in Part I, a GET request was initiated to retrieve the survey using the Fetch API and display the suvey as outlined in INSTRUCTIONS.md. One of the fun challenges of this project was figuring out how to display each question one at a time, and then automatically submit the user's responses upon answering the final question. I knew that I needed to have a variable to track the index of the current question, and decided to increment this value when the user clicks one of the answers.

```javascript
# /client/src/components/DiagnosticScreener

export default function DiagnosticScreener() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState([])

  const handleClick = (e, i) => {
    if (currentQuestion < questions.length) {
      const response = {
        value: answers[i].value,
        question_id: questions[currentQuestion].question_id
      }
      setUserResponses([...userResponses, response])
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  return (
    <div className="survey-answers">
      {answers.map((answer, i) => (
        <div key={i} className="survey-answer" onClick={(e) => handleClick(e, i)}>
          {answer.title}
        </div>
      ))}
    </div>
  )
}
```

Adding a bit of defensive code to prevent out of bounds errors, this process works really well. The problem I ran into was when I tried to submit the data once the last question was answered. At first, I was just submitting the user resposnes immediately after using the setState function for userResopnses.

```javascript
# /client/src/components/DiagnosticScreener

const handleClick = (e, i) => {
  if (currentQuestion < questions.length) {
    const response = {
      value: answers[i].value,
      question_id: questions[currentQuestion].question_id,
    };
    setUserResponses([...userResponses, response]);
    setCurrentQuestion((prev) => prev + 1);
  }

  if (currentQuestion === questions.length) {
    fetch("/api/survey", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"answers": userResponses})
    })
    .then((res) => ...)
    .catch((err) => ...)
  }
};
```

This approach fails because the setState function is asynchronous, and when submitting the user responses, the last answer is not accounted for in the body of the request. This was resolved by using the useEffect hook with the userResponses variable in the dependency list. Once all the user's responses were stored in state a new fetch request was sent to the API to process the data.

```javascript
# /client/src/components/DiagnosticScreener

useEffect(() => {
  if (userResponses.length === questions.length && isLoaded) {
    // isLoaded is set to true after initial mount
    fetch("/api/survey/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: userResponses }),
    })
      .then((res) => ...)
      .catch((error) => ...);
  }
}, [userResponses]);
```

In the future I would like to implement more robust and dynamic survey response validators before submitting. While the application is currently navigatable by keyboard, I would like to spend more time learning how to make the site as accessible as possible for all users.

I probably should have used prebuilt componenets and a CSS framework to speed up the development of the frontend, but as I'm not too familiar with these tools yet I chose not to use them for this small of a project as it would have taken me longer to learn how to use them than to create everything from scratch.

### Production

If this application were to be deployed to production mantaining high availability and high performance is a must. Implementing a load balancer and creating more instances of the Express API server would ensure the load is spread over a larger number of servers preventing any slowdowns that might arise from multiple incoming requests.

The next technique that can improve availability and performance is to cache the most frequently accessed data. If the cached data are static assests, then the use a content deliver network would help to reduce server load and improve response time for the users.

The use of performance monitoring tools to identify potential bottlenecks would be useful for maintaining the performance of the application. Some of the most common bottlenecks are from inefficient database queries, so optimizing queries is necessary for improving the response of the application.

There is no such thing as bug-free code. The best way to protect the live application is to use automated testing to catch any potential bugs before deploying to production. Although this approach isn't foolproof, debugging in a live environment presents its own challenges. A recommended initial step is to diligently log and monitor major events, errors, and exceptions, including relevant details, which aids in tracing issues. Feature flags can serve as toggle mechanisms to enable/disable specific features and restrict their access to certain user subsets, thus minimizing the impact of bugs. Additionally, debugging endpoints can be utilized to obtain precise information, diagnostic data, or trigger targeted actions in the production environment for issue detection. Lastly, leveraging version control is essential for rolling back to the previous stable build, ensuring the best possible user experience.

### Final Thoughts

I had a lot of fun with this project, and as a former healthcare professional, I can truly appreciate the practicality of this application. Throughout my experience, I witnessed firsthand the challenges faced by therapists due to heavy patient loads and the nature of their work. Unfortunately, mental health is often undervalued in comparison to physical health, despite its equal significance. While there has been a recent movement highlighting the importance of therapy, the quality of care provided often falls short of its potential effectiveness. By utilizing platforms like Blueprint, clinicians can access valuable data to personalize their care for individual patients, ultimately enhancing the overall effectiveness of treatment.

## Deploying Locally

### <em>If you do not already have Node and npm installed, please follow this [guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)</em>

### Starting Backend

- Clone this repository to your local machine
- Navigate to the server directory `/server` and install the dependencies by running:

```bash
npm install
```

- Be sure to create a .env file in the root of the server directory using the .env.example file as a guide.
- To start the server run the following command:

```bash
npm start
```

### Starting Frontend

- Keeping the server terminal open, open a second terminal and navigate to the client directory `/client` and install the dependencies by running:

```bash
npm install
```

- \*\*NOTE: if your server is listening on a different port than 8000, you will need to update the proxy field in `/client/package.json` to reflect what port your server is listening on

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
- \*\*NOTE: If you would like/need to have the frontend listen on a different port, create a .env file based on the .env.example file in the clinet directory

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
