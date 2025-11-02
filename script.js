function fetchMissions() {
  const missions = JSON.parse(localStorage.getItem("missions"));
  return missions;
}

const container = document.getElementById("missionsContainer");
const searchInput = document.getElementById("search-filter");

function card(data) {
  return `<div class="Artemis">
            <img class="mission-img" src="${data.image}" alt="Artemis">
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



