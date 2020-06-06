class Prompt {
    constructor(content) {
        this.content = content
        Prompt.all.push(this);
    }

    static all = [];
}

// const fetchAllPrompts = () => {
//     const promptsArr = [];
//     fetch(`${baseURL}prompts`)
//     .then(res => res.json())
//     .then(prompts => {
//         prompts.data.forEach(prompt => {
//             promptsArr.push(prompt.attributes.content)
//         })
//     })
//     return promptsArr;
// }