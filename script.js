function formSubmit(){

    let radioButtons = document.getElementsByName("gender")
    let name = document.getElementById("name").value;
    console.log(name)
    let gender;
    for(var i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            gender= radioButtons[i].value;
        }
    }

    console.log("lets fetch")
    fetch(`https://api.genderize.io/?name=${name}`,{method:"GET"})
        .then(response => response.json())
        .then(data => console.log(data));


    event.preventDefault()

}
