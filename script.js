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

let currentTab = "all";

//fetching
function fetchMissions() {
  const missions = JSON.parse(localStorage.getItem("missions"));
  return missions;
}

const container = document.getElementById("missionsContainer");
const searchInput = document.getElementById("search-filter");

// Card data
function card(data) {
  return `<div class="Artemis">
              <div class="miss-img-container">
                  <img class="mission-img" src="${data.image}" alt="Artemis"> 
                  <div class="crudbtns">
                      <button onclick="deleteMissionById(${
                        data.id
                      })"><i class="fa-solid fa-trash delete"></i></i></button>
                      <button onclick="editMission(${
                        data.id
                      })"><i class="fa-solid fa-pen modif"></i></button>
                      <input type="hidden" id="missionId">
                      <button onclick="toggleFavorite(${data.id})">
  <i class="fa-solid fa-heart fav ${data.favorite ? "active" : ""}"></i>
</button>
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

// Displaying the missions
function displayMission(data, targetContainer = container) {
  targetContainer.innerHTML = "";
  data.forEach((m) => {
    targetContainer.innerHTML += card(m);
  });
}

// Loading the missions
function loadMissions() {
  if (currentTab === "all") {
    displayMission(fetchMissions() || []);
  } else if (currentTab === "fav") {
    showFavourites();
  }
}

loadMissions();

// Search filter
searchInput.onkeyup = function filterMissions() {
  const filtredData = [];

  const data = fetchMissions();
  container.innerHTML = "";
  data.forEach((m) => {
    if (
      m.name
        .toLocaleLowerCase()
        .startsWith(searchInput.value.toLocaleLowerCase()) ||
      m.agency
        .toLocaleLowerCase()
        .startsWith(searchInput.value.toLocaleLowerCase())
    ) {
      filtredData.push(m);
    }
  });
  displayMission(filtredData);
};

// adding mission modal
const openBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");
const closemodelBtn = document.getElementById("closeModalBtn");
const missionForm = document.getElementById("missionForm");

openBtn.onclick = function () {
  modal.style.display = "block";
};

closemodelBtn.onclick = function () {
  modal.style.display = "none";
};

//close modal when clic outside modalcontent
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// // adding a mession
// Handle Add Mission form submission
missionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const imageFile = document.getElementById("missionImage").files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const missions = JSON.parse(localStorage.getItem("missions")) || [];
    const id = document.getElementById("missionId").value;

    const missionData = {
      id: id ? Number(id) : Date.now(),
      name: document.getElementById("missionName").value,
      agency: document.getElementById("missionAgency").value,
      date: document.getElementById("missionDate").value,
      description: document.getElementById("missionDesc").value,
      image: imageFile
        ? reader.result
        : missions.find((m) => m.id === Number(id))?.image || "",
      // Preserve the favorite property when editing
      favorite: id
        ? missions.find((m) => m.id === Number(id))?.favorite || false
        : false,
    };

    if (id) {
      // update existing
      const index = missions.findIndex((m) => m.id === Number(id));
      missions[index] = missionData;
    } else {
      // add new - default favorite to false for new missions
      missionData.favorite = false;
      missions.push(missionData);
    }

    localStorage.setItem("missions", JSON.stringify(missions));
    modal.style.display = "none";
    missionForm.reset();
    document.getElementById("missionId").value = ""; // reset hidden id
    loadMissions();
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    reader.onload();
  }
});

// deleting a mission
function deleteMissionById(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this mission?"
  );

  if (!confirmDelete) return; // stop if user clicks "Cancel"

  const missions = JSON.parse(localStorage.getItem("missions")) || [];
  const updated = missions.filter((m) => m.id !== id);
  localStorage.setItem("missions", JSON.stringify(updated));
  loadMissions();
}

// edit mission
function editMission(id) {
  const missions = JSON.parse(localStorage.getItem("missions")) || [];
  const mission = missions.find((m) => m.id === id);
  if (!mission) return;

  // Fill the form
  document.getElementById("missionName").value = mission.name;
  document.getElementById("missionAgency").value = mission.agency;
  document.getElementById("missionDate").value = mission.date;
  document.getElementById("missionDesc").value = mission.description;

  // Store id for editing
  document.getElementById("missionId").value = mission.id;

  document.getElementById("modalmodif").innerText = "Modify Mission";
  document.getElementById("modalmodifBtn").innerText = "Modify";

  // Open the modal
  modal.style.display = "block";
}

// Year filter
const yearFilter = document.getElementById("myear");

yearFilter.addEventListener("change", filterMissions);

// selec filter
const agencyFilter = document.getElementById("agency");

agencyFilter.addEventListener("change", filterMissions);
searchInput.addEventListener("keyup", filterMissions);

function filterMissions() {
  let data = fetchMissions() || [];

  // If in the favorites tab fea only show favorites
  if (currentTab === "fav") {
    data = data.filter((m) => m.favorite);
  }

  const searchText = searchInput.value.toLowerCase();
  const selectedAgency = agencyFilter.value;
  const selectedYear = yearFilter.value;

  const filtered = data.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchText) ||
      m.agency.toLowerCase().includes(searchText);
    const matchesAgency =
      selectedAgency === "All agencies" || m.agency === selectedAgency;

    //year filtering logic
    let matchesYear = true;
    if (selectedYear !== "All years") {
      const missionYear = extractYearFromDate(m.date);
      matchesYear = missionYear === selectedYear;
    }

    return matchesSearch && matchesAgency && matchesYear;
  });

  displayMission(filtered);
}

// extracrt year from date
function extractYearFromDate(dateString) {
  if (!dateString) return "";

  // Handle different date formats
  if (dateString.includes("/")) {
    // Format: DD/MM/YYYY
    const parts = dateString.split("/");
    return parts[2] || parts[0]; // Return YYYY part
  } else if (dateString.includes("-")) {
    // Format: YYYY-MM-DD
    return dateString.split("-")[0];
  }

  // If it's just a year, return as is
  return dateString;
}

// tab switcher
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("ifactive"));

    tab.classList.add("ifactive");
    
    // update current tab
    currentTab = tab.value; 

  
    filterMissions();
  });
});

// fav button toggle
function toggleFavorite(id) {
  const missions = JSON.parse(localStorage.getItem("missions")) || [];
  const mission = missions.find((m) => m.id === id);
  if (!mission) return;

  // toggle
  mission.favorite = !mission.favorite;

  // save
  localStorage.setItem("missions", JSON.stringify(missions));

  loadMissions();

  const sidebarEl = document.getElementById("sidebar");
  if (sidebarEl.style.transform === "translateX(0px)" || sidebarEl.style.transform === "translateX(0)") {
    const favMissions = missions.filter((m) => m.favorite);
    displayMission(favMissions, document.getElementById("favMissionsContainer"));
  }
}


//favoutites
function showFavourites() {
  filterMissions();
}

// the script for the sidebar
const openSidebarEl = document.getElementById("open-sidebar");
const closeSidebarEl = document.getElementById("close-sidebar");
const sidebarEl = document.getElementById("sidebar");
const overlayEl = document.getElementById("overlay");

openSidebarEl.addEventListener("click", () => {
  
  sidebarEl.style.transform = "translateX(0)";
  overlayEl.classList.add("active");

  // Load and display favorite missions
  const missions = fetchMissions() || [];
  const favMissions = missions.filter((m) => m.favorite);
  displayMission(favMissions, document.getElementById("favMissionsContainer"));
});

closeSidebarEl.addEventListener("click", () => {
  sidebarEl.style.transform = "translateX(100%)";
  overlayEl.classList.remove("active");
});

overlayEl.addEventListener("click", () => {
  sidebarEl.style.transform = "translateX(100%)";
  overlayEl.classList.remove("active");
});