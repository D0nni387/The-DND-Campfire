

  function classFetch() {
  
    fetch("http://dnd5eapi.co/api/classes/")
        .then(response => response.json())
        .then(classes => {
            let classList = classes.results;
            classList.forEach(classOp => {

                let classOption = document.createElement("option");
                let className = document.createElement("p");
                let name = document.createTextNode(classOp.name);

                className.appendChild(name);
                classOption.appendChild(className);
                classOption.id = classOp.index;
                classOption.classList.add("class");
                document.getElementById("class").appendChild(classOption);
            });
            s
        })
        .catch(() => console.error());
}