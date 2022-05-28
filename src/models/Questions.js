class Questions {
    static #questionsToProvider = 
        [
            {
                id: 1,
                question: "Would you like to eat dinner here?"
            },
            {
                id: 2,
                question: "Would you like to eat lunch here?"
            },
            {
                id: 3,
                question: "Would you like to eat breakfast here?"
            },
            {
                id: 4,
                question: "Are you a vegetarian?"
            },
            {
                id: 5,
                question: "Are you a vegan?"
            },
            {
                id: 6,
                question: "Do you have any food allergies?"
            },
            {
                id: 7,
                question: "Are you lactose intolerant?"
            },
            {
                id: 8,
                question: "Are you gluten intolerant?"
            },
            {
                id: 9,
                question: "Do you bring food?"
            },
            {
                id: 10,
                question: "Do you drink coffee in the morning?"
            },
            {
                id: 11,
                question: "Do you like milk in you coffee?"
            },
            {
                id: 12,
                question: "Do you like oat milk?"
            },
            {
                id: 13,
                question: "Do you like rice milk?"
            },
            {
                id: 14,
                question: "Do you like almond milk?"
            },
            {
                id: 15,
                question: "Do you drink Tea in the morning?"
            },
            {
                id: 16,
                question: "Do you like green tea?"
            },
            {
                id: 17,
                question: "Do you like black tea?"
            },
            {
                id: 18,
                question: "Do you like fruit tea?"
            },
            {
                id: 19,
                question: "Would you like to have some bread for breakfast?"
            },
            {
                id: 20,
                question: "Would you like to eat yoghurt for breakfast?"
            },
            {
                id: 21,
                question: "Are you coming by bicycle?"
            },
            {
                id: 22,
                question: "Are you coming by public transport?"
            },
            {
                id: 23,
                question: "Are you coming by car?"
            },
            {
                id: 24,
                question: "Are you bringing a sleeping bag?"
            },
            {
                id: 25,
                question: "Are you a bachelor student?"
            },
            {
                id: 26,
                question: "Are you a master student?"
            },
            {
                id: 27,
                question: "Are you a PhD student?"
            },
            {
                id: 28,
                question: "Do you speak German?"
            },
            {
                id: 29,
                question: "Do you like sports?"
            },
            {
                id: 30,
                question: "Do you play an instrument?"
            },
            {
                id: 31,
                question: "Do you like gaming?"
            },
            {
                id: 32,
                question: "Do you like literature?"
            }
        ]

    static #questionsToApplicant =
    [
        {
            id: 1,
            question: "Are you a vegetarian?"
        },
        {
            id: 2,
            question: "Are you a vegan?"
        },
        {
            id: 3,
            question: "Do you have any food allergies?"
        },
        {
            id: 4,
            question: "Are you lactose intolerant?"
        },
        {
            id: 5,
            question: "Are you gluten intolerant?"
        },
        {
            id: 6,
            question: "Do you have a garage?"
        },
        {
            id: 7,
            question: "Should I bring a sleeping bag"
        },
        {
            id: 8,
            question: "Are you a bachelor student?"
        },
        {
            id: 9,
            question: "Are you a master student?"
        },
        {
            id: 10,
            question: "Are you a PhD student?"
        },
        {
            id: 11,
            question: "Do you speak German?"
        },
        {
            id: 12,
            question: "Do you like sports?"
        },
        {
            id: 13,
            question: "Do you play an instrument?"
        },
        {
            id: 14,
            question: "Do you like gaming?"
        },
        {
            id: 15,
            question: "Do you like literature?"
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