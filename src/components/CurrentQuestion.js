/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from 'reducers/quiz';
import { OptionButton, HintButton } from './styled_components/buttons.js'
import { Progressbar } from './styled_components/progressbar.js';
import { QuizSummary } from './QuizSummary'
import Hint from './Hint.js';

const QuestionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  background-color: gray;
  border: 3px solid black;
  @media (min-width: 744px) {
    width: 40vw;
  }
`;

const QuestionContainer = styled.div`
  position: relative;
  display: flex;
  background-color: rgba(255, 255, 255, .15);  
  backdrop-filter: blur(9px);
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 90%;
  height: 40vh;
  padding: 2rem;
  margin-bottom: 2rem;
  margin-top: 9rem;
  z-index: 2;
  border-radius: 5px;
`;

const OptionsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
font-family: "Sarpanch";
`

const ImgQuestion = styled.img`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 40vh;
  z-index: 1;
`;

const HintContainer = styled.div`
width: fit-content;
background-color: white;
border: 2px solid orange;
padding: 2rem;
font-family: "Sarpanch";
`;

/*
const clip = keyframes`
  0% {
    clip-path: polygon(
      0 100%,
      100% 100%,
      100% 120%,
      0 120%
    );
  }

  100% {
    clip-path: polygon(
      0 -20%,
      100% -20%,
      100% 0%,
      0 0
    );
  }
`;
const GlitchHeading = styled.h1`
  position: relative;
  color: #fff;

  ${[...Array(10)].map((_, i) => `
    &:before:nth-child(${i + 1}) {
      content: '${i === 0 ? '' : 'Question: '}';
      position: absolute;
      top: 0;
      left: 0;
      animation:
        ${clip} 3000ms ${(i + 1) * -300}ms linear infinite,
        ${glitch(i + 1)} 500ms ${(Math.random() * 1000) * -1}ms linear infinite;
    }
  `).join('')}
`;
*/
export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex]);
  const dispatch = useDispatch();
  const [showHint, setShowHint] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);

  const quizOver = useSelector((state) => state.quiz.quizOver)

  useEffect(() => {
    setShowHint(false);
    setWasClicked(false)
  }, [question]); // Sets state to false every time the question changes

  const handleAnswerClick = (answerIndex) => {
    dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex }));
    // Submit answer to the store
    setWasClicked(true);
    setTimeout(() => {
      dispatch(quiz.actions.goToNextQuestion());
    }, 100); // Delays the rendering of the next question after a button has been clicked
  };

  if (quizOver) {
    return <QuizSummary />
  }

  const handleHintClick = () => {
    setShowHint(!showHint);
  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <>
      <ImgQuestion src={question.imgUrl} />
      <QuestionWrapper>
        <QuestionContainer>
          <h1>{question.questionText}</h1>
        </QuestionContainer>
        <OptionsContainer>
          {question.options.map((optionText, optionIndex) => (
            <OptionButton
              key={optionText}
              onClick={() => handleAnswerClick(optionIndex)}
              disabled={wasClicked}>
              {optionText}
            </OptionButton>
          ))}
        </OptionsContainer>
        <HintContainer>
          <HintButton onClick={handleHintClick}>{showHint}Would you like a hint?</HintButton>
          {showHint && <Hint question={question} />}
        </HintContainer>
        <Progressbar totalQuestions={5} />
      </QuestionWrapper>
    </>
  );
};
