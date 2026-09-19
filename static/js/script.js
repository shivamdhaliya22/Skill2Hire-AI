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

        // Skill gap
        document.getElementById("skill-gap").textContent =
            data.skill_gap;

        // Roadmap
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

        // Reset progress
        updateProgress();

        // Scroll to results
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


// Mark roadmap step as completed
function completeStep(button) {

    const item = button.parentElement;

    if (item.classList.contains("completed")) {
        return;
    }

    item.classList.add("completed");

    button.textContent = "Completed ✓";
    button.disabled = true;

    updateProgress();
}


// Update progress bar
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

    // Roadmap progress
    document.getElementById("progress-percent").textContent =
        `${percentage}%`;

    document.getElementById("progress-fill").style.width =
        `${percentage}%`;

    document.getElementById("progress-text").textContent =
        `${completed} of ${total} steps completed`;

    // Career readiness
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

// Mock Interview
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
        <p>🎤 Interview Question</p>
        <br>
        <p>${randomQuestion}</p>
    `;

    document.getElementById("interview-answer").value = "";

    document.getElementById("interview-feedback").innerHTML = "";
}


// Submit interview answer
function submitAnswer() {

    const answer =
        document.getElementById("interview-answer").value.trim();

    const feedback =
        document.getElementById("interview-feedback");

    if (!answer) {

        feedback.innerHTML = `
            <h4>⚠️ No Answer</h4>
            <p>Please write an answer before submitting.</p>
        `;

        return;
    }

    const wordCount =
        answer.split(/\s+/).length;

    let feedbackMessage = "";
    let suggestion = "";

    if (wordCount < 20) {

        feedbackMessage =
            "Your answer is quite short.";

        suggestion =
            "Try adding more details, your role in the project, and the technologies you used.";

    } else if (wordCount < 50) {

        feedbackMessage =
            "Good start! Your answer has some useful details.";

        suggestion =
            "Try explaining the challenges you faced and how you solved them.";

    } else {

        feedbackMessage =
            "Good answer! You have provided enough detail.";

        suggestion =
            "For an interview, keep your answer structured and highlight your contribution and results.";
    }

    feedback.innerHTML = `
        <h4>💡 Interview Feedback</h4>

        <p>${feedbackMessage}</p>

        <p><strong>Suggestion:</strong> ${suggestion}</p>

        <p>
            <strong>Answer length:</strong>
            ${wordCount} words
        </p>
    `;
}