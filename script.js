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

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  const missions = JSON.parse(localStorage.getItem("missions")) || [];
  if (missions.length === 0) {
    const defaultMissions = [
      {
    "id": 1,
    "name": "Artemis II",
    "agency": "NASA",
    "description": "Four astronauts will venture around the Moon on Artemis II, the first crewed mission on NASA's path to establishing a long-term presence at the Moon for science and exploration.",
    "date": "2026-02-05",
    "image": "./Images/missionpage/Artemis.png"
  },
  {
    "id": 2,
    "name": "Commercial Crew",
    "agency": "NASA",
    "description": "NASA’s Commercial Crew Program is delivering on its goal of safe, reliable, and cost-effective human transportation to and from the International Space Station.",
    "date": "2020-11-16",
    "image": "./Images/missionpage/Comercial-grew.png"
  },
  {
    "id": 3,
    "name": "Hubble Space Telescope",
    "agency": "NASA",
    "description": "Since its 1990 launch, the Hubble Space Telescope has changed our fundamental understanding of the universe.",
    "date": "1990-04-24",
    "image": "./Images/missionpage/Hubble.png"
  },
  {
    "id": 4,
    "name": "James Webb Space Telescope",
    "agency": "NASA",
    "description": "Webb is the premier observatory of the next decade, serving thousands of astronomers worldwide. It studies every phase in the history of our Universe.",
    "date": "2021-12-25",
    "image": "./Images/missionpage/James-web.png"
  },
  {
    "id": 5,
    "name": "Juno: Mission At Jupiter",
    "agency": "NASA",
    "description": "Probing beneath Jupiter's dense clouds to answer questions about the origin and evolution of Jupiter, our solar system, and giant planets across the cosmos.",
    "date": "2011-08-05",
    "image": "./Images/missionpage/Juno.png"
  },
  {
    "id": 6,
    "name": "International Space Station",
    "agency": "NASA",
    "description": "The International Space Station Program brings together international flight crews, multiple launch vehicles, the international scientific research community and much more.",
    "date": "1998-11-20",
    "image": "./Images/missionpage/International-space.png"
  },
  {
    "id": 7,
    "name": "Perseverance Mars Rover",
    "agency": "NASA",
    "description": "This rover and its aerial sidekick were assigned to study the geology of Mars and much more.",
    "date": "2020-07-30",
    "image": "./Images/missionpage/mars-rover.png"
  },
  {
    "id": 8,
    "name": "Parker Solar Probe",
    "agency": "NASA",
    "description": "On a mission to “touch the Sun,” NASA's Parker Solar Probe became the first spacecraft to fly through the corona – the Sun’s upper atmosphere.",
    "date": "2018-08-12",
    "image": "./Images/missionpage/parker-solar.png"
  },
  {
    "id": 9,
    "name": "Quesst",
    "agency": "NASA",
    "description": "NASA's mission to demonstrate how the X-59 can fly supersonic without generating loud sonic booms.",
    "date": "2020-11-16",
    "image": "./Images/missionpage/quest.png"
  },
  {
    "id": 10,
    "name": "JUICE",
    "agency": "ESA",
    "description": "JUICE launched on April 14, 2023, to study Jupiter’s icy moons—Ganymede, Callisto, and Europa—for potential signs of oceans and life.",
    "date": "2023-04-14",
    "image": "./Images/missionpage/juice.png"
  }
    ];
    localStorage.setItem("missions", JSON.stringify(defaultMissions));
  }

  loadMissions();
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
                      <div class="mission-smallcard"><img src="./Images/Home/object/calender-icon.png"
                              alt="calender-icon">
                          <p>${data.date}</p>
                      </div>
                      <div class="mission-smallcard"><img src="./Images/Home/object/rocket-icon.png" alt="calender-icon">
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