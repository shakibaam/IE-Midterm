
//function for save button
function save() {
    console.log("lets save");
    let name = document.getElementById("name").value;
    let radioButtons = document.getElementsByName("gender");
    console.log(name)
    let gender = null;
    //check if a radio button is checked or not
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            gender = radioButtons[i].value;
        }
    }
    // if a user predict for his/herself then we save his/her prediction otherwise we save our prediction
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
    // after save we clear the input and prediction section
    document.getElementById("gender-predict").innerHTML ="";
    document.getElementById("prob-predict").innerHTML = "";
    document.getElementById("name").value = "";
    event.preventDefault()

}
//function for clear the saved gender
function clearSave() {
    console.log("let's clear");
    let name = document.getElementById("name").value;
    //check if the key exists then remove
    if (localStorage.getItem(name)) {
        localStorage.removeItem(name);
        document.getElementsByClassName("saved-answer")[0].style.display = "none";
    }


}

//function for submit form

function submit_with_emtiyazi() {
    console.log("lets submit")
    //first we clear the prediction of the last input if exist
    document.getElementsByClassName("saved-answer")[0].style.display = "none";
    document.getElementById("prob-predict").innerHTML = "";
    let name = document.getElementById("name").value;

    // define a flag for check the constraints on input

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
    //if everything ok then we fetch from api
    if (flag) {
        console.log("lets fetch");
        fetch(`https://api.genderize.io/?name=${name}`, {method: "GET"})
            .then(response =>{
                // if we have network error
                if (!response.ok){

                    document.getElementById("gender-predict").innerHTML = "Network response was not ok, " + response.status


                }
                //otherwise we return the json of response
                else {
                    return response.json();
                }

            }

                )
            .then(data => {

                // converting json to string then string to obj
                nameObj = JSON.stringify(data);
                nameObj = JSON.parse(nameObj)
                // if gender is != null then the name is in database otherwise it isn't
                if (nameObj.gender !== null) {
                    // show the gender and prediction
                    document.getElementById("gender-predict").innerHTML = nameObj.gender;
                    document.getElementById("prob-predict").innerHTML = nameObj.probability;
                    //check if we have the saved gender or not
                    if (localStorage.getItem(name)) {
                        document.getElementById("saved-gender").innerHTML = localStorage.getItem(name);
                        document.getElementsByClassName("saved-answer")[0].style.display = "block";
                    }
                }
                 //if gender is null then show this message
                 else {
                    document.getElementById("gender-predict").innerHTML = "Your name is not in database";
                }


            })
            //check for other errors
            .catch((error) => {
                document.getElementById("gender-predict").innerHTML = `There has been a problem with your fetch operation: <code class="hl-red">${error}</code> <br />`
            })
        ;
    }


    event.preventDefault()

}


