class Prompt {
    constructor(content) {
        this.content = content
        // Right now I am only storing prompt contents in Prompt.all so it is just an array of strings.
        // If prompt objects had more attributes I would want to update to 'this' rather than 'this.content'
        Prompt.all.push(this.content);
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