import { students } from "./data.js";

const handleMarkLowScore = () => {
  const trEls = document.querySelectorAll("#tableBody tr");

  trEls.forEach((tr) => {
    const score = tr.querySelector("td:last-child").innerText;
    if (score < 50) {
      tr.classList.add("table-danger");
    }
  });
};

const loadData = () => {
  let html = "";
  students.forEach((student, index) => {
    html += `
    <tr>
        <td>${index}</td>
        <td>${student.name}</td>
        <td>${student.score}</td>
    </tr>
    `;
  });

  document.querySelector(".table tbody").innerHTML = html;
  document
    .getElementById("marklowscore")
    .addEventListener("click", handleMarkLowScore);
};

loadData();
