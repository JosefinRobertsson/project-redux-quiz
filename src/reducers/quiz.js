import { createSlice } from '@reduxjs/toolkit'

const questions = [
  { id: 1,
    questionText: 'What does AI stand for?',
    options: ['Automatic Intelligence', 'Artifical Information', 'Automatic information', 'Artificial intelligence'],
    hint: 'Hint for Q1',
    correctAnswerIndex: 3 },
  { id: 2,
    questionText: 'When was the term AI first used?',
    options: ['1956', '1943', '2022', '1997'],
    hint: 'Hint for Q2',
    correctAnswerIndex: 0 },
  { id: 3,
    questionText: 'What is the name of Google´s AI Chatbot?',
    options: ['Barry', 'Bard', 'Bert', 'Burt'],
    hint: 'Hint for Q3',
    correctAnswerIndex: 1 },
  { id: 4,
    questionText: 'Which of the following is an example of AI-technology?',
    options: ['Deep learning', 'Quick learning', 'Shallow learning', 'Heavy learning'],
    hint: 'Hint for Q4',
    correctAnswerIndex: 0 },
  { id: 5,
    questionText: 'The term "Friendly AI" was introduced by...?',
    options: ['Steve Jobs', 'Alan Turing', 'Marvin Minsky', 'Eliezer Yudkowsky'],
    hint: 'Hint for Q5',
    correctAnswerIndex: 3 }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
