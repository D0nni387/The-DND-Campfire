const classId = document.getElementById("progress");
const progress = document.getElementById("progressTwo")
const classChoice = document.getElementById("classList")
const load = document.getElementById("loading");



let baseURL = "https://cors-anywhere.herokuapp.com/https://dnd5eapi.co/api/"


/**
 * Fetches classes and populates select data
 */
function classFetch() {

  fetch(`${baseURL}classes`)
    .then(response => response.json())
    .then(classes => {
      let i = 1
      let classList = classes.results;
      delete classList[5]
      classList.forEach(classOp => {

        let classOption = document.createElement("option");
        let className = document.createElement("p");
        let name = document.createTextNode(classOp.name);


        className.appendChild(name);
        classOption.appendChild(className);
        classOption.id = classOp.index;
        classOption.classList.add("class");
        className.id = i
        className.classList.add("classId")
        document.getElementById("classList").appendChild(classOption);
        i++
      });

    })
    .catch(() => console.error());
}

classFetch();

classId.addEventListener('click', () => {
  id = classChoice.options[classChoice.selectedIndex].id;
  profFetch();
});

/**
 * Fetches Proficiencies and populates select data
 */
function profFetch() {

  fetch(`${baseURL}classes/${id}`)
    .then(response => response.json())
    .then(profs => {

      let hit = profs.hit_die
      document.getElementById("hitDie").value = (`${hit}`)

      let saveOne = profs.saving_throws[0].name
      document.getElementById("savingThrow1").value = (`${saveOne}`)

      let saveTwo = profs.saving_throws[1].name
      document.getElementById("savingThrow2").value = (`${saveTwo}`)

      let profList = profs.proficiency_choices[0].from
      profList.forEach(profOf => {
        let profOption = document.createElement("option");
        let profName = document.createElement("p");
        let name = document.createTextNode(profOf.name)


        profName.appendChild(name)
        profOption.appendChild(profName)
        profOption.id = profOf.index
        profOption.classList.add("skill")
        document.getElementById("proficienciesOne").appendChild(profOption)

      })
      profList.forEach(profOf => {
        let profOption = document.createElement("option");
        let profName = document.createElement("p");
        let name = document.createTextNode(profOf.name)


        profName.appendChild(name)
        profOption.appendChild(profName)
        profOption.id = profOf.index
        profOption.classList.add("skill")
        document.getElementById("proficienciesTwo").appendChild(profOption)

      })
    })
}

/**
 * Fetches starting-equipment and creates div elements
 */
function equipFetch() {
  fetch(`${baseURL}starting-equipment/${idNum}`)
    .then(response => response.json())
    .then(equip => {

        let startEquipOne = equip.starting_equipment[0].item.name
        document.getElementById("startEquip1").value = (`${startEquipOne}`)

        let startEquipTwo = equip.starting_equipment[1].item.name
        document.getElementById("startEquip2").value = (`${startEquipTwo}`)

      }

    )
}


progress.addEventListener('click', () => {
  idNum = classChoice.options[classChoice.selectedIndex].firstElementChild.id
  equipFetch();
});

function loader(loading) {
  if (loading) {
    load.classList.remove("hide");
  } else {
    load.classList.add("hide");
  }
}