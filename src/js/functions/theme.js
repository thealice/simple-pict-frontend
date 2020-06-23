const getThemes = () => {

    fetch(`${baseURL}themes`)
    .then(res => res.json())
    .then(themes => {
        themes.data.forEach(theme => {
            let themeObj = new Theme(theme.attributes.name, theme.attributes.id)
            theme.attributes.prompts.forEach(prompt => {
                let promptObj = new Prompt(prompt.id, prompt.content, themeObj)
                themeObj.prompts.push(promptObj)
            })
        })
        promptForm();
    })

}

function renderThemeOptions(arrayOfThemeObjs, where_id) {
    let selectOptions = document.getElementById(where_id)
    arrayOfThemeObjs.forEach(themeObj => {
        let themeOption = document.createElement("option");
        themeOption.innerHTML += themeObj.name;
        themeOption.value = themeObj.id;
        selectOptions.appendChild(themeOption);
    })
}