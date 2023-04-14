import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const MainContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 15px;
  `

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  position: relative;
  :before {
    content: '';
    position: absolute;
    background: #b5cbce;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: '';
    position: absolute;
    background: #38454f;
    height: 4px;
    width: ${(props) => props.width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`

const StepWrapper = styled.div`
position: relative;
z-index: 1;
`
const StepStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid ${({ step }) => (step === 'completed' ? '#38454f' : '#b5cbce')};
  transition: 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StepCount = styled.span`
  font-size: 19px;
  color: #b5cbce;
`
const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #4a154b;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`

export const Progressbar = ({ totalQuestions }) => {
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const questions = useSelector((state) => state.quiz.questions)
  const width = `${(100 / (totalQuestions - 1)) * currentQuestionIndex - 1}%`;
  const steps = questions.map(({ id }, index) => ({
    label: `Question ${index + 1}`,
    step: id
  }));

  return (
    <MainContainer>
      <StepContainer width={width}>
        {steps.map(({ step }) => (
          <StepWrapper key={step}>
            <StepStyle
              step={currentQuestionIndex >= step ? 'completed' : 'incomplete'}>
              {currentQuestionIndex >= step
                ? (<CheckMark>L</CheckMark>)
                : (<StepCount>{step}</StepCount>)}
            </StepStyle>
          </StepWrapper>
        ))}
      </StepContainer>
    </MainContainer>
  )
}