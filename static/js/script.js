async function analyzeSkills() {
    const skills = document.getElementById("skills").value.trim();
    const targetRole = document.getElementById("target-role").value.trim();

    if (!skills || !targetRole) {
        alert("Please enter your current skills and target role.");
        return;
    }

    const button = document.querySelector(".analyzer-card .primary-btn");

    button.textContent = "Analyzing...";
    button.disabled = true;

    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                skills: skills,
                target_role: targetRole
            })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error("Analysis failed.");
        }

        document.getElementById("skill-gap").textContent =
            data.skill_gap;

        const roadmapContainer =
            document.getElementById("roadmap-container");

        roadmapContainer.innerHTML = "";

        data.roadmap.forEach((step, index) => {
            const item = document.createElement("div");
            item.className = "roadmap-item";

            item.innerHTML = `
                <h3>${index + 1}. ${step.title}</h3>

                <p>${step.description}</p>

                <strong>Task:</strong>
                <p>${step.task}</p>

                <button class="complete-btn" onclick="completeStep(this)">
                    Mark as Completed ✓
                </button>
            `;

            roadmapContainer.appendChild(item);
        });

        // Save current roadmap information
        localStorage.setItem(
            "skill2hire_role",
            targetRole
        );

        localStorage.setItem(
            "skill2hire_skills",
            skills
        );

        // Reset completion state for a new analysis
        localStorage.removeItem("skill2hire_completed");

        updateProgress();

        document.getElementById("results").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);

        alert(
            "Something went wrong. Please make sure the Flask server is running."
        );
    } finally {
        button.textContent = "Analyze My Skills →";
        button.disabled = false;
    }
}


function completeStep(button) {
    const item = button.parentElement;

    if (item.classList.contains("completed")) {
        return;
    }

    item.classList.add("completed");

    button.textContent = "Completed ✓";
    button.disabled = true;

    saveProgress();
    updateProgress();
}


function saveProgress() {
    const steps =
        document.querySelectorAll(".roadmap-item");

    const completedSteps = [];

    steps.forEach((step, index) => {
        if (step.classList.contains("completed")) {
            completedSteps.push(index);
        }
    });

    localStorage.setItem(
        "skill2hire_completed",
        JSON.stringify(completedSteps)
    );
}


function loadProgress() {
    const savedProgress =
        localStorage.getItem("skill2hire_completed");

    if (!savedProgress) {
        updateProgress();
        return;
    }

    const completedSteps =
        JSON.parse(savedProgress);

    const steps =
        document.querySelectorAll(".roadmap-item");

    completedSteps.forEach(index => {
        if (steps[index]) {
            const button =
                steps[index].querySelector(".complete-btn");

            steps[index].classList.add("completed");

            if (button) {
                button.textContent = "Completed ✓";
                button.disabled = true;
            }
        }
    });

    updateProgress();
}


function updateProgress() {
    const steps =
        document.querySelectorAll(".roadmap-item");

    const completedSteps =
        document.querySelectorAll(".roadmap-item.completed");

    const total = steps.length;
    const completed = completedSteps.length;

    if (total === 0) {
        return;
    }

    const percentage =
        Math.round((completed / total) * 100);

    document.getElementById("progress-percent").textContent =
        `${percentage}%`;

    document.getElementById("progress-fill").style.width =
        `${percentage}%`;

    document.getElementById("progress-text").textContent =
        `${completed} of ${total} steps completed`;

    const readinessScore = percentage;

    document.getElementById("readiness-score").textContent =
        `${readinessScore}%`;

    document.getElementById("readiness-circle-score").textContent =
        `${readinessScore}%`;

    if (readinessScore === 0) {
        document.getElementById("readiness-text").textContent =
            "Start your roadmap to improve your career readiness.";
    } else if (readinessScore < 50) {
        document.getElementById("readiness-text").textContent =
            "Good start! Keep completing your roadmap steps.";
    } else if (readinessScore < 100) {
        document.getElementById("readiness-text").textContent =
            "You're making great progress. Keep going!";
    } else {
        document.getElementById("readiness-text").textContent =
            "Amazing! You've completed your learning roadmap.";
    }
}


function startInterview() {
    const targetRole =
        document.getElementById("target-role").value.trim();

    let questions = [];

    if (targetRole.toLowerCase().includes("frontend")) {

        questions = [
            "What is the difference between HTML, CSS and JavaScript?",
            "What is responsive web design and why is it important?",
            "Tell me about a frontend project you have worked on."
        ];

    } else if (targetRole.toLowerCase().includes("python")) {

        questions = [
            "What are the main features of Python?",
            "What is the difference between a list and a tuple in Python?",
            "Tell me about a Python project you have worked on."
        ];

    } else if (
        targetRole.toLowerCase().includes("data") ||
        targetRole.toLowerCase().includes("analyst")
    ) {

        questions = [
            "What is the difference between SQL and Python?",
            "What is data cleaning and why is it important?",
            "Tell me about a data analysis project you have worked on."
        ];

    } else {

        questions = [
            "Tell me about yourself and your development journey.",
            "What technical skills are you currently improving?",
            "Tell me about a project you have worked on."
        ];
    }

    const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];

    document.getElementById("interview-question").innerHTML = `
        <p>Interview Question</p>
        <br>
        <p>${randomQuestion}</p>
    `;

    document.getElementById("interview-answer").value = "";
    document.getElementById("interview-feedback").innerHTML = "";
}


function submitAnswer() {
    const answer =
        document.getElementById("interview-answer").value.trim();

    if (!answer) {
        document.getElementById("interview-score").textContent = "—";

        document.getElementById("interview-strength").textContent =
            "No answer submitted yet.";

        document.getElementById("interview-improvement").textContent =
            "Write an answer before submitting.";

        document.getElementById("interview-suggestion").textContent =
            "Start with a clear explanation and include a practical example.";

        return;
    }

    const wordCount =
        answer.split(/\s+/).length;

    let score;
    let strength;
    let improvement;
    let suggestion;

    if (wordCount < 20) {

        score = 45;

        strength =
            "You gave a direct answer and stayed focused.";

        improvement =
            "Your answer needs more detail and context.";

        suggestion =
            "Add your role, the technology you used, and one practical example.";

    } else if (wordCount < 50) {

        score = 70;

        strength =
            "Good start with a reasonable amount of detail.";

        improvement =
            "Try explaining your reasoning or experience more clearly.";

        suggestion =
            "Use a simple structure: situation, what you did, and the result.";

    } else {

        score = 90;

        strength =
            "Your answer is detailed and shows good communication.";

        improvement =
            "Keep the answer focused so the important points stand out.";

        suggestion =
            "Highlight your personal contribution and the result you achieved.";
    }


    document.getElementById("interview-score").textContent =
        `${score}/100`;

    document.getElementById("interview-strength").textContent =
        strength;

    document.getElementById("interview-improvement").textContent =
        improvement;

    document.getElementById("interview-suggestion").textContent =
        suggestion;
}


// Restore saved roadmap progress after page reload
window.addEventListener("load", function () {
    loadProgress();
});