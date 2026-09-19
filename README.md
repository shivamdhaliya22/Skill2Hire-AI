# Skill2Hire AI

A simple project we built to help students figure out what they need to learn for their target job role.

## What is Skill2Hire AI?

As students, we often know what job we want, but don't always know:

* What skills are actually required?
* Which skills are we missing?
* What should we learn first?
* How do we prepare for interviews?

We made **Skill2Hire AI** to bring these things together in one place.

You enter your current skills and the role you want, and the website gives you a skill gap, a learning roadmap, progress tracking, and some role-based interview questions.

## What can you do with it?

### Skill Gap Analysis

Enter your current skills and target role to see what areas you should focus on.

### Learning Roadmap

Get a simple step-by-step roadmap with practical tasks.

### Track Your Progress

Complete roadmap steps and see your progress percentage.

### Career Readiness

See your readiness percentage based on how much of your roadmap you've completed.

### Mock Interview

Get questions based on your selected role and practice your answers.

### Interview Feedback

After submitting an answer, you get a basic score, strengths, improvement points, and a suggestion for your next answer.

## How it works

```text
Your Skills
     ↓
Target Job Role
     ↓
Skill Gap
     ↓
Learning Roadmap
     ↓
Track Progress
     ↓
Mock Interview
     ↓
Feedback
```

## Roles we tested

Currently, the project has different flows for:

* Frontend Developer
* Web Developer
* Python Developer
* Data Analyst
* Other general development roles

## Tech Used

* HTML
* CSS
* JavaScript
* Python
* Flask
* Git & GitHub
* Render

## Project Structure

```text
Skill2Hire-AI/
│
├── app.py
├── requirements.txt
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Run it locally

Clone the project:

```bash
git clone https://github.com/shivamdhaliya22/Skill2Hire-AI.git
```

Go inside the project:

```bash
cd Skill2Hire-AI
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Run the app:

```bash
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

## What's next?

There are a few things we would like to add in the future:

* Better AI-based skill analysis
* More job roles
* Course/resource recommendations
* Login and user profiles
* Database for saving progress
* Resume analysis
* Better interview evaluation

## Built for Hack Devengers 2.0

Made as a student project for **Hack Devengers 2.0** on Unstop.

We built this to solve a problem that we as students also face — **knowing what to learn next for the job we want.**
