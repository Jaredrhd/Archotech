class QuestionManager {
    static questions = [];
    static currQuestion;

    static addQuestion(question) {
        this.questions.push(question);
    }

    static getBSTQuestion() {
        return this.getQuestion("bst");
    }

    static getTraversalQuestion() {
        return this.getQuestion("traversal");
    }

    static getQuestion(questionType) {
        let question;

        for(question of this.questions) {
            if(question.qTypeName === questionType) return question;
        }
    }
}