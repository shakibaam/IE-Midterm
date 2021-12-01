function formSubmit() {

    let radioButtons = document.getElementsByName("gender")
    let name = document.getElementById("name").value;
    console.log(name);

    console.log("lets fetch")
    fetch(`https://api.genderize.io/?name=${name}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {

            console.log(data);
            nameObj = JSON.stringify(data);
            nameObj = JSON.parse(nameObj)

            document.getElementById("gender-predict").innerHTML = nameObj.gender;
            document.getElementById("prob-predict").innerHTML = nameObj.probability;
            if (localStorage.getItem(name)) {
                document.getElementById("saved-gender").innerHTML = localStorage.getItem(name);
                document.getElementsByClassName("saved-answer")[0].style.visibility = "visible";
            }

        });

    event.preventDefault()

}

function save() {
    let name = document.getElementById("name").value;
    let radioButtons = document.getElementsByName("gender");
    console.log(name)
    let gender = null;
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            gender = radioButtons[i].value;
        }
    }
    if (gender != null) {
        if (localStorage.getItem(name)) {
            localStorage.removeItem(name);
            localStorage.setItem(name, gender);
        } else {
            localStorage.setItem(name, gender)
        }
    } else {

        localStorage.setItem(name, document.getElementById("gender-predict").innerHTML)
    }
    event.preventDefault()

}
