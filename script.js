function formSubmit() {
    console.log("lets submit")
    let radioButtons = document.getElementsByName("gender")
    let name = document.getElementById("name").value;
    flag = true;
    console.log(name);
    if (!/^[A-Za-z\s]*$/.test(name)) {
        window.alert("Please enter a valid name");
        flag = false;
    }

    if (name.length > 255) {
        window.alert("your name is too long");
        flag = false;
    }
    if (flag) {
        console.log("lets fetch");
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
                    document.getElementsByClassName("saved-answer")[0].style.display = "block";
                }

            });
    }


    event.preventDefault()

}

function save() {
    console.log("lets save");
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

function clearSave() {
    console.log("let's clear");
    let name = document.getElementById("name").value;
    if (localStorage.getItem(name)) {
        localStorage.removeItem(name);
    }


}

function submit_emtiyazi() {
    console.log("lets submit")
    document.getElementsByClassName("saved-answer")[0].style.display = "none";
    document.getElementById("prob-predict").innerHTML = "";
    let radioButtons = document.getElementsByName("gender")
    let name = document.getElementById("name").value;
    flag = true;
    console.log(name);
    if (!/^[A-Za-z\s]*$/.test(name)) {
        window.alert("Please enter a valid name");
        flag = false;
    }

    if (name.length > 255) {
        window.alert("your name is too long");
        flag = false;
    }
    if (flag) {
        console.log("lets fetch");
        fetch(`https://api.genderize.io/?name=${name}`, {method: "GET"})
            .then(response =>{
                if (!response.ok){

                    document.getElementById("gender-predict").innerHTML = "Network response was not ok, " + response.status


                }
                else {
                    return response.json();
                }

            }

                )
            .then(data => {


                nameObj = JSON.stringify(data);
                nameObj = JSON.parse(nameObj)

                if (nameObj.gender !== null) {
                    document.getElementById("gender-predict").innerHTML = nameObj.gender;
                    document.getElementById("prob-predict").innerHTML = nameObj.probability;
                    if (localStorage.getItem(name)) {
                        document.getElementById("saved-gender").innerHTML = localStorage.getItem(name);
                        document.getElementsByClassName("saved-answer")[0].style.display = "block";
                    }
                }
                 else {
                    document.getElementById("gender-predict").innerHTML = "Your name is not in database";
                }


            })
            .catch((error) => {
                document.getElementById("gender-predict").innerHTML = `There has been a problem with your fetch operation: <code class="hl-red">${error}</code> <br />`
            })
        ;
    }


    event.preventDefault()

}


