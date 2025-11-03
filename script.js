// Sidebar
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".close-btn");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sidebar.classList.add("active");
});


closeBtn.addEventListener("click", () => {
  hamburger.classList.remove("active");
  sidebar.classList.remove("active");
});

function fetchMissions() {
  const missions = JSON.parse(localStorage.getItem("missions"));
  return missions;
}

const container = document.getElementById("missionsContainer");
const searchInput = document.getElementById("search-filter");

function card(data) {
  return `<div class="Artemis">
            <div class="miss-img-container">
                <img class="mission-img" src="${data.image}" alt="Artemis"> 
                <div class="crudbtns">
                    <button><i class="fa-solid fa-trash delete"></i></i></button>
                    <button><i class="fa-solid fa-pen modif"></i></button>
                    <button><i class="fa-solid fa-heart fav"></i></button>
                </div>
            </div>
            <div class="Artemis-infos">
                <p id="missionheading">${data.name}</p>
                <p id="missionarticle">${data.description}
                </p>
                <div class="dateplusagency">
                    <div class="mission-smallcard"><img src="./images/Home/object/calender-icon.png"
                            alt="calender-icon">
                        <p>${data.date}</p>
                    </div>
                    <div class="mission-smallcard"><img src="./images/Home/object/rocket-icon.png" alt="calender-icon">
                        <p>${data.agency}</p>
                    </div>
                </div>
            </div>
        </div>`;
}

function displayMission(data) {
  container.innerHTML = "";
  data.forEach((m) => {
    container.innerHTML += card(m);
  });
}

function loadMissions() {
  const data = fetchMissions();
  displayMission(data);
}
loadMissions();


searchInput.onkeyup = function searchFilter() {
  const filtredData = [];
  
  const data = fetchMissions();
  container.innerHTML = "";
  data.forEach((m) => {
  // const agencySelect = document.getElementById("agency");
  // const selectedAgency = agencySelect.value.toLowerCase();
  // const agencyFilter = !selectedAgency || selectedAgency === 'all' || m.agency.toLowerCase() === selectedAgency;
    if (
      (m.name
        .toLocaleLowerCase()
        .startsWith(searchInput.value.toLocaleLowerCase()) ||
      m.agency
        .toLocaleLowerCase()
        .startsWith(searchInput.value.toLocaleLowerCase()))
        //  && agencyFilter
    ) {
      filtredData.push(m);
    }
  });
  displayMission(filtredData);
};

// adding mission modal
      const openBtn = document.getElementById('openModalBtn');
      const modal = document.getElementById('modal');
      const closemodelBtn = document.getElementById('closeModalBtn');
      const missionForm = document.getElementById('missionForm');

      openBtn.onclick = function () {
        modal.style.display = 'block';
      };

      closemodelBtn.onclick = function () {
        modal.style.display = 'none';
      };

      //close modal when clicking outside modal-content
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
