from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    skills = data.get("skills", "").lower()
    target_role = data.get("target_role", "").lower()

    roadmap = []
    skill_gap = ""

    # Frontend Developer
    if "frontend" in target_role or "web developer" in target_role:

        required_skills = [
            "html",
            "css",
            "javascript",
            "git",
            "responsive design"
        ]

        missing_skills = [
            skill for skill in required_skills
            if skill not in skills
        ]

        if missing_skills:
            missing_text = ", ".join(
                skill.title() for skill in missing_skills
            )

            skill_gap = (
                "Your current skills provide a good starting point. "
                f"For a Frontend Developer role, you should focus on: "
                f"{missing_text}."
            )
        else:
            skill_gap = (
                "You have covered the main foundational skills for "
                "a Frontend Developer role. Focus on advanced projects "
                "and interview preparation."
            )

        # Personalized roadmap
        if "javascript" in missing_skills:
            roadmap.append({
                "title": "Learn JavaScript",
                "description": "Learn variables, functions, arrays, objects and modern JavaScript.",
                "task": "Build a JavaScript To-Do List."
            })

        if "responsive design" in missing_skills:
            roadmap.append({
                "title": "Learn Responsive Design",
                "description": "Learn how to make websites work well on mobile, tablet and desktop.",
                "task": "Convert your portfolio into a responsive website."
            })

        if "html" in missing_skills or "css" in missing_skills:
            roadmap.append({
                "title": "Strengthen HTML & CSS",
                "description": "Build strong foundations for modern web development.",
                "task": "Create a responsive personal portfolio page."
            })

        if "git" in missing_skills:
            roadmap.append({
                "title": "Learn Git & GitHub",
                "description": "Practice version control and collaborative development.",
                "task": "Create a GitHub repository and push your project."
            })

        roadmap.append({
            "title": "Practice DOM Manipulation",
            "description": "Learn how JavaScript interacts with HTML elements.",
            "task": "Create an interactive form with validation."
        })

        roadmap.append({
            "title": "Build a Real Project",
            "description": "Apply your skills in a complete practical project.",
            "task": "Build and deploy a complete frontend application."
        })

        roadmap = roadmap[:7]

    # Python Developer
    elif "python" in target_role:

        skill_gap = (
            "For a Python Developer role, focus on Python fundamentals, "
            "data structures, APIs, databases, Git and project development."
        )

        roadmap = [
            {
                "title": "Strengthen Python",
                "description": "Master functions, modules, exceptions and OOP.",
                "task": "Build a command-line Python application."
            },
            {
                "title": "Practice DSA",
                "description": "Improve problem-solving using Python.",
                "task": "Solve 20 array, string and searching problems."
            },
            {
                "title": "Learn APIs",
                "description": "Understand how applications communicate using APIs.",
                "task": "Build a small Python API client."
            },
            {
                "title": "Learn SQL",
                "description": "Understand how Python applications work with databases.",
                "task": "Create a small CRUD application using SQLite."
            },
            {
                "title": "Build a Project",
                "description": "Combine Python, APIs and databases.",
                "task": "Build and deploy a complete Python project."
            }
        ]

    # Data Analyst
    elif "data" in target_role or "analyst" in target_role:

        skill_gap = (
            "For a Data Analyst role, strengthen SQL, Python, Pandas, "
            "data visualization and basic statistics."
        )

        roadmap = [
            {
                "title": "Learn SQL",
                "description": "Learn queries, filtering, joins and aggregation.",
                "task": "Practice SQL queries on a sample database."
            },
            {
                "title": "Learn Pandas",
                "description": "Use Python to clean and analyze datasets.",
                "task": "Analyze a CSV dataset using Pandas."
            },
            {
                "title": "Practice Data Visualization",
                "description": "Learn to communicate insights using charts.",
                "task": "Create a dashboard with multiple charts."
            },
            {
                "title": "Learn Statistics",
                "description": "Understand averages, distributions and basic statistical concepts.",
                "task": "Analyze a dataset using basic statistics."
            },
            {
                "title": "Build a Data Project",
                "description": "Combine analysis and visualization into one project.",
                "task": "Create a complete data-analysis portfolio project."
            }
        ]

    # Generic role
    else:

        skill_gap = (
            f"For a {target_role.title()} role, identify the core technical "
            "skills required for the position and strengthen them through "
            "projects, problem-solving and practical practice."
        )

        roadmap = [
            {
                "title": "Strengthen Your Fundamentals",
                "description": "Build a strong foundation in the skills required for your target role.",
                "task": "Review the core concepts of your target domain."
            },
            {
                "title": "Practice Problem Solving",
                "description": "Improve your ability to solve real-world technical problems.",
                "task": "Solve 10 beginner-to-intermediate problems."
            },
            {
                "title": "Learn Industry Tools",
                "description": "Become familiar with commonly used development tools.",
                "task": "Learn Git and create a GitHub repository."
            },
            {
                "title": "Build a Project",
                "description": "Apply your knowledge through hands-on development.",
                "task": "Build a project related to your target role."
            },
            {
                "title": "Prepare for Interviews",
                "description": "Practice technical and behavioral interview questions.",
                "task": "Complete three mock interviews."
            }
        ]

    return jsonify({
        "success": True,
        "skills": skills,
        "target_role": target_role,
        "skill_gap": skill_gap,
        "roadmap": roadmap
    })


if __name__ == "__main__":
    app.run(debug=True)