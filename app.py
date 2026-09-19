from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/analyze", methods=["POST"])
def analyze():

    data = request.get_json() or {}

    skills_input = data.get("skills", "").strip()
    target_role = data.get("target_role", "").strip()

    skills = skills_input.lower()
    role = target_role.lower()

    roadmap = []

    # ==========================================
    # NORMALIZE COMMON SKILL NAMES
    # ==========================================

    skill_aliases = {
        "html5": "html",
        "css3": "css",
        "js": "javascript",
        "ecmascript": "javascript",
        "github": "git",
        "git hub": "git",
        "responsive web design": "responsive design",
        "responsive websites": "responsive design",
        "python basics": "python",
        "python programming": "python"
    }

    normalized_skills = skills

    for alias, actual_skill in skill_aliases.items():
        if alias in normalized_skills:
            normalized_skills += " " + actual_skill

    # ==========================================
    # FRONTEND / WEB DEVELOPER
    # ==========================================

    if (
        "frontend" in role
        or "front end" in role
        or "web developer" in role
        or "web development" in role
    ):

        required_skills = [
            "html",
            "css",
            "javascript",
            "git",
            "responsive design"
        ]

        missing_skills = [
            skill
            for skill in required_skills
            if skill not in normalized_skills
        ]

        if missing_skills:

            missing_text = ", ".join(
                skill.title()
                for skill in missing_skills
            )

            skill_gap = (
                "You already have a useful starting foundation. "
                f"For a Frontend Developer role, your main skill gaps are: "
                f"{missing_text}. "
                "Focus on these areas first and then apply them through projects."
            )

        else:

            skill_gap = (
                "You have covered the main foundational skills required "
                "for a Frontend Developer role. "
                "Your next focus should be advanced JavaScript, "
                "real-world projects and interview preparation."
            )

        # JavaScript
        if "javascript" in missing_skills:

            roadmap.append({
                "title": "Learn JavaScript",
                "description": (
                    "Learn variables, functions, arrays, objects, "
                    "DOM manipulation and modern JavaScript."
                ),
                "task": "Build a JavaScript To-Do List."
            })

        # Responsive Design
        if "responsive design" in missing_skills:

            roadmap.append({
                "title": "Learn Responsive Design",
                "description": (
                    "Learn how to create websites that work well "
                    "on mobile, tablet and desktop."
                ),
                "task": "Convert a portfolio page into a responsive website."
            })

        # HTML/CSS
        if "html" in missing_skills or "css" in missing_skills:

            roadmap.append({
                "title": "Strengthen HTML & CSS",
                "description": (
                    "Build strong foundations in semantic HTML, "
                    "CSS layouts, Flexbox and Grid."
                ),
                "task": "Create a responsive personal portfolio page."
            })

        # Git
        if "git" in missing_skills:

            roadmap.append({
                "title": "Learn Git & GitHub",
                "description": (
                    "Practice version control, commits, branches "
                    "and working with GitHub repositories."
                ),
                "task": "Create a GitHub repository and push your project."
            })

        # DOM
        roadmap.append({
            "title": "Practice DOM Manipulation",
            "description": (
                "Learn how JavaScript interacts with HTML elements "
                "and responds to user actions."
            ),
            "task": "Create an interactive form with validation."
        })

        # Project
        roadmap.append({
            "title": "Build a Real Project",
            "description": (
                "Combine your frontend skills in a complete "
                "practical application."
            ),
            "task": "Build and deploy a complete frontend application."
        })

        roadmap = roadmap[:7]

    # ==========================================
    # PYTHON DEVELOPER
    # ==========================================

    elif "python" in role:

        skill_gap = (
            "For a Python Developer role, focus on Python fundamentals, "
            "data structures, APIs, databases, Git and practical projects."
        )

        roadmap = [

            {
                "title": "Strengthen Python",
                "description": (
                    "Master functions, modules, exceptions, "
                    "file handling and OOP."
                ),
                "task": "Build a command-line Python application."
            },

            {
                "title": "Practice DSA",
                "description": (
                    "Improve problem-solving using arrays, strings, "
                    "searching and sorting."
                ),
                "task": "Solve 20 beginner-to-intermediate DSA problems."
            },

            {
                "title": "Learn APIs",
                "description": (
                    "Understand how applications communicate "
                    "using APIs."
                ),
                "task": "Build a small Python API client."
            },

            {
                "title": "Learn SQL",
                "description": (
                    "Understand databases, queries and CRUD operations."
                ),
                "task": "Create a small CRUD application using SQLite."
            },

            {
                "title": "Build a Project",
                "description": (
                    "Combine Python, APIs and databases "
                    "in one practical project."
                ),
                "task": "Build and deploy a complete Python project."
            }
        ]

    # ==========================================
    # DATA / ANALYST
    # ==========================================

    elif "data" in role or "analyst" in role:

        skill_gap = (
            "For a Data Analyst role, strengthen SQL, Python, "
            "Pandas, data visualization and basic statistics."
        )

        roadmap = [

            {
                "title": "Learn SQL",
                "description": (
                    "Learn queries, filtering, joins and aggregation."
                ),
                "task": "Practice SQL queries on a sample database."
            },

            {
                "title": "Learn Pandas",
                "description": (
                    "Use Python to clean, transform and analyze datasets."
                ),
                "task": "Analyze a CSV dataset using Pandas."
            },

            {
                "title": "Practice Data Visualization",
                "description": (
                    "Learn how to communicate insights using charts."
                ),
                "task": "Create a dashboard with multiple charts."
            },

            {
                "title": "Learn Statistics",
                "description": (
                    "Understand averages, distributions and "
                    "basic statistical concepts."
                ),
                "task": "Analyze a dataset using basic statistics."
            },

            {
                "title": "Build a Data Project",
                "description": (
                    "Combine analysis and visualization "
                    "into one complete project."
                ),
                "task": "Create a complete data-analysis portfolio project."
            }
        ]

    # ==========================================
    # GENERIC ROLE
    # ==========================================

    else:

        role_name = target_role.title() if target_role else "your target role"

        skill_gap = (
            f"For a {role_name} role, identify the core technical "
            "skills required for the position and strengthen them "
            "through practical learning, problem-solving and projects."
        )

        roadmap = [

            {
                "title": "Strengthen Your Fundamentals",
                "description": (
                    "Build a strong foundation in the skills "
                    "required for your target role."
                ),
                "task": "Review the core concepts of your target domain."
            },

            {
                "title": "Practice Problem Solving",
                "description": (
                    "Improve your ability to solve "
                    "real-world technical problems."
                ),
                "task": "Solve 10 beginner-to-intermediate problems."
            },

            {
                "title": "Learn Industry Tools",
                "description": (
                    "Become familiar with commonly used "
                    "development and collaboration tools."
                ),
                "task": "Learn Git and create a GitHub repository."
            },

            {
                "title": "Build a Project",
                "description": (
                    "Apply your knowledge through "
                    "hands-on development."
                ),
                "task": "Build a project related to your target role."
            },

            {
                "title": "Prepare for Interviews",
                "description": (
                    "Practice technical and behavioral "
                    "interview questions."
                ),
                "task": "Complete three mock interviews."
            }
        ]

    return jsonify({
        "success": True,
        "skills": skills_input,
        "target_role": target_role,
        "skill_gap": skill_gap,
        "roadmap": roadmap
    })


if __name__ == "__main__":
    app.run(debug=True)