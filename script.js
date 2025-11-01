async function loadMissions() {
  const response = await fetch('missions.json');
  const missions = await response.json();
  displayMissions(missions);
}

function displayMissions(missions) {
  const container = document.getElementById('missionsContainer');
  container.innerHTML = '';

  missions.forEach(m => {
    const card = `<div class="Artemis">
            <img class="mission-img" src="${m.image}" alt="Artemis">
            <div class="Artemis-infos">
                <p id="missionheading">${m.name}</p>
                <p id="missionarticle">${m.description}
                </p>
                <div class="dateplusagency">
                    <div class="mission-smallcard"><img src="./images/Home/object/calender-icon.png"
                            alt="calender-icon">
                        <p>${m.date}</p>
                    </div>
                    <div class="mission-smallcard"><img src="./images/Home/object/rocket-icon.png" alt="calender-icon">
                        <p>${m.agency}</p>
                    </div>
                </div>
            </div>
        </div>`

        container.insertAdjacentHTML("beforeend",card);
  });
}

loadMissions();
