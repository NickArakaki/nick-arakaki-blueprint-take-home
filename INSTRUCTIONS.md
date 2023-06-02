You will find the instructions for the coding exercise below. Remember, we're not expecting you to create a perfect solution. The exercise is intentionally limited and meant to give us insight into how you think, how you code, and how you communicate a solution to a problem.

If you have any questions, feel free to reach out to us directly!

# About the exercise

At Blueprint, all of our engineers are experienced in full-stack technology. This means we frequently build both the front- and back-end components of a feature. As such, the coding exercise is broken up into two parts: one involving the creation of an API and the other a user interface. It is fine if you do not complete everything. You should be able to work on each independently, though you are encouraged to submit both if you can. You can spend as much or as little time as you’d like on the exercise, however, **we ask that you send us a submission no later than one week after receiving this exercise.**

# Background and context

One component of our platform is administering standardized clinical assessments via our mobile app and web interface. In a nutshell, a standardized clinical assessment is a multiple-choice questionnaire that determines symptom severity for disorders such as depression, anxiety, etc. Here’s an [example](https://www.mdcalc.com/phq-9-patient-health-questionnaire-9) of a common assessment for depression called the PHQ-9.

At the moment, clinicians can manually choose and assign assessments to patients, sometimes having to review each assessment before assigning it. In order to improve a clinician's ability to provide the right care, we have recently launched an innovative tool that allows a patient to take a **diagnostic screener** (a special assessment that covers a wide variety of symptoms) using our platform. Our system then scores a patient's response to this screener and automatically assigns assessments based on their symptoms. The goal of this exercise is to see how you would approach developing the same feature with reduced scope.

# Part I

## The exercise

Build a small API with a single endpoint which accepts a patient's answers to the screener as JSON. Then, score the answers and return the appropriate assessments.

Input:

- Each answer will have a value and question id
- The minimum value for each answer is 0 and the maximum value is 4
- Example:

```
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

Separate from the input, each question will have an associated domain as indicated by the following domain mapping. This domain mapping should be stored and retrieved from persistence using a system (file storage, nosql, postgres, etc) of your choosing:

```
[
  {
    "question_id": "question_a",
    "domain": "depression"
  },
  {
    "question_id": "question_b",
    "domain": "depression"
  },
  {
    "question_id": "question_c",
    "domain": "mania"
  },
  {
    "question_id": "question_d",
    "domain": "mania"
  },
  {
    "question_id": "question_e",
    "domain": "anxiety"
  },
  {
    "question_id": "question_f",
    "domain": "anxiety"
  },
  {
    "question_id": "question_g",
    "domain": "anxiety"
  },
   {
    "question_id": "question_h",
    "domain": "substance_use"
  },
]
```

Using the patient's answers and the domain mapping, you should find the total score for each domain. Finally, return which Level-2 Assessments should be assigned based on the following criteria:

| Domain        | Total Score | Level-2 Assessment |
| ------------- | ----------- | ------------------ |
| Depression    | >= 2        | PHQ-9              |
| Mania         | >= 2        | ASRM               |
| Anxiety       | >= 2        | PHQ-9              |
| Substance Use | >= 1        | ASSIST             |

As an example, if the input is the same as the example above, the expected output would be:

```
{
  "results": ["ASRM", "PHQ-9"]
}
```

We know this is the expected output because the patient scored >= 2 in the Mania domain and >= 2 in the Anxiety domain.

You're free to use whatever language, framework, libraries, tools, editors, search engines, etc you like in order to complete the exercise.

# Part II

## The exercise

You will build upon Part I and create a patient-facing user interface to complete the diagnostic screener. The interface can be built on a web or mobile (iOS or Android) platform.

In order to retrieve the diagnostic screener, you should build an endpoint in your API which returns it as a JSON object in the following form. Alternatively, you may simply load the screener from memory:

```
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

This screener always contains:

- A unique id
- Metadata about the assessment (name, display name, disorder)
- An array of questions
- An array of answers

Using the JSON form of the screener, you should build an interface that directs the patient through each question one by one. That is, each question should be displayed on the view one at a time.

As a patient answers each question, you will need to keep track of how they answered so the data can be sent to the backend and ultimately stored in a database. **You should store the answer data in the same format as the input for Part I.**

### Requirements/Specs

- You can complete this exercise using any language or framework that you choose
- Questions should be displayed one at a time on a given page/screen
- Each page/screen should display:
  - The prompt for the user (the `title` of the first `section`)
  - The assessment `display_name`
  - The question `title`
  - All answer options for the given assessment, as buttons that just display the answer `title` as text
  - The question number out of the total number of questions in all assessments (e.g. `1 out of 8`)
- Tapping on an answer option should automatically advance the user to the next question
- Across all screens, display a progress bar that indicates where the user is in the overall assessment experience that udpates with each completed question
- Upon answering the final question, you may simply log/print out the data or send it to the endpoint you built in Part I. As a reminder, here is an example of the format:

```

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

# Deliverable

- When you’re done with the coding exercise, you may host it somewhere (e.g. on Amazon EC2, Heroku, Google AppEngine, TestFlight, etc.) or include specific instructions for running the code in your README
- Please send us a link to the hosted repository with your code (e.g. Github, Bitbucket)
  - If you decide to make two separate repos, send us links to both
- The repo should include a README that includes the following items:
  - Link to to the hosted application (if there is one)
  - Instructions for running the code locally (if not hosted)
  - Description of the problem and solution
  - Reasoning behind your technical choices
  - Describe how you would deploy this as a true production app on the platform of your choice:
    - How would ensure the application is highly available and performs well?
    - How would you secure it?
    - What would you add to make it easier to troubleshoot problems while it is running live?
  - Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project
  - Link to other code you're particularly proud of
  - Link to your resume or public profile
- **Please send these deliverables over at least 48 hours in advance of your scheduled interview time so we can review and come prepared with questions! If we don't receive your submission, we may opt to cancel or reschedule the interview so we can be sure we're using your and our time effectively**

# How we review

**We value quality over feature-completeness.** It is fine to leave things aside provided you call them out in your project's README. The goal of this code exercise is to help us identify what you consider production-ready code. You should consider this code ready for final review with your colleague, i.e. this would be the last step before deploying to production.

The aspects of your code we will assess include:

- **Clarity**: Does the README clearly and concisely explains the problem and solution? Are technical tradeoffs explained?
- **Correctness**: Does the application do what was asked? If there is anything missing, does the README explain why it is missing?
- **Code quality**: Is the code simple, easy to understand, and maintainable? Are there any code smells or other red flags? Does object-oriented code follow principles such as the single responsibility principle? Is the coding style consistent with the language's guidelines? Is it consistent throughout the codebase?
- **Security**: Are there any obvious vulnerabilities?
- **UX**: Is the web interface understandable and pleasing to use?
- **Technical choices**: Do choices of libraries, frameworks, etc seem appropriate for the chosen application?
- **Production readiness thinking**: Does the description of a production deployment address important real-world topics like reliability and security?
