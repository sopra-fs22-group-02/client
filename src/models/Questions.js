class Questions {
    static #questionsToProvider = 
        [
            {
                id: 1,
                question: "Do you like Pizza?"
            },
            {
                id: 2,
                question: "Should I bring some food?"
            },
            {
                id: 3,
                question: "Do you like gardening?"
            },
            {
                id: 4,
                question: "Do you like traveling?"
            },
            {
                id: 5,
                question: "Do you like literature?"
            },
            {
                id: 6,
                question: "Do you like software engineering?"
            }
        ]

    static #questionsToApplicant =
    [
        {
            id: 1,
            question: "A"
        },
        {
            id: 2,
            question: "B"
        },
        {
            id: 3,
            question: "C"
        }
    ] 

    static getQuestionsToApplicant() {
        return this.#questionsToApplicant;
    }

    static getQuestionsToProvider() {
        return this.#questionsToProvider;
    }

}
export default Questions;