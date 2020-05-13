const baseURL = "https://cors-anywhere.herokuapp.com/https://dnd5eapi.co/api/";
const proficienciesOne = document.getElementById("proficienciesOne");
const proficienciesTwo = document.getElementById("proficienciesTwo");
const equipmentChoice = document.getElementById("equipmentChoice");
const savingThrow1 = document.getElementById("savingThrow1");
const savingThrow2 = document.getElementById("savingThrow2");
const startEquip1 = document.getElementById("startEquip1");
const startEquip2 = document.getElementById("startEquip2");
const confirmEdit = document.getElementById("confirmEdit");
const confirmAdd = document.getElementById("confirmAdd");
const phaseThree = document.getElementById("phaseThree");
const classesList = document.getElementById("classList");
const classChoice = document.getElementById("classList");
const progress = document.getElementById("progressTwo");
const phaseOne = document.getElementById("phaseOne");
const phaseTwo = document.getElementById("phaseTwo");
const classId = document.getElementById("progress");
const initial = document.getElementById("phase");
const hitDie = document.getElementById("hitDie");
const load = document.getElementById("loading");
const begin = document.getElementById("start");

let edit = false

begin.addEventListener('click', () => {
  initial.classList.add("hide")
  classFetch();
})

function selectList(profList, target, naming) {
  if (naming) {
    profList.forEach(item => {
      let profOption = document.createElement("option");
      let profName = document.createElement("p");
      let name = document.createTextNode(item.name)

      profName.appendChild(name)
      profOption.appendChild(profName)
      profOption.id = item.index
      profOption.classList.add("skill")
      target.appendChild(profOption)
    })
  } else {
    profList.forEach(item => {
      let profOption = document.createElement("option");
      let profName = document.createElement("p");
      let name = document.createTextNode(item.item.name)

      profName.appendChild(name)
      profOption.appendChild(profName)
      profOption.id = item.index
      profOption.classList.add("skill")
      target.appendChild(profOption)
    })
  }
}

/**
 * Fetches classes and populates select data
 */
function classFetch() {
  loader(true)
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
        classesList.appendChild(classOption);
        i++
      });
    })
    .catch(() => console.error());
  loader(false)
  phaseOne.classList.remove("hide")
}

classId.addEventListener('click', () => {
  id = classChoice.options[classChoice.selectedIndex].id;
  phaseOne.classList.add("hide")
  profFetch();
});

/**
 * Fetches Proficiencies and populates select data
 */
function profFetch() {
  loader(true)
  fetch(`${baseURL}classes/${id}`)
    .then(response => response.json())
    .then(profs => {

      let hit = profs.hit_die
      hitDie.value = (`${hit}`)

      let saveOne = profs.saving_throws[0].name
      savingThrow1.value = (`${saveOne}`)

      let saveTwo = profs.saving_throws[1].name
      savingThrow2.value = (`${saveTwo}`)

      let profList = profs.proficiency_choices[0].from
      selectList(profList, proficienciesOne, true)
      selectList(profList, proficienciesTwo, true)
    })
  phaseTwo.classList.remove("hide")
  loader(false)
}

progress.addEventListener('click', () => {
  idNum = classChoice.options[classChoice.selectedIndex].firstElementChild.id
  phaseTwo.classList.add("hide")
  equipFetch();
});

/**
 * Fetches starting-equipment and creates div elements
 */
function equipFetch() {
  loader(true)
  fetch(`${baseURL}starting-equipment/${idNum}`)
    .then(response => response.json())
    .then(equip => {

      let startEquipOne = equip.starting_equipment[0].item.name
      startEquip1.value = (`${startEquipOne}`)

      if (equip.starting_equipment[1]) {
        let startEquipTwo = equip.starting_equipment[1].item.name
        startEquip2.value = (`${startEquipTwo}`)
      } else {
        startEquip2.value = (`No Secondary Equipment`)
      }
      let profList = equip.choice_1[1].from
      selectList(profList, equipmentChoice, false)
    })
  loader(false)
  phaseThree.classList.remove("hide")
  if (edit == true) {
    confirmEdit.classList.remove("hide")
  } else {
    confirmAdd.classList.remove("hide")
  }
}

function loader(loading) {
  if (loading) {
    load.classList.remove("hide");
  } else {
    load.classList.add("hide");
  }
}