import { useState } from "react";
import Question from "./Question";

interface QuestionField {
  questionName: string;
  questionNumber: number;
  correctAnswer: string;
  incorrectAnswers: string[];
}

const Quiz = () => {
  const [questionsData, setQuestionsData] = useState<QuestionField[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const handleOnAnswerSubmitted = (correct: boolean) => {
    console.log(correct ? "Correct" : "Wrong");
    setQuestionNumber(questionNumber + 1);
    correct && setCorrectAnswers(correctAnswers + 1);
    questionNumber >= 9 && setIsFinished(true);
    console.log(questionNumber);
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://the-trivia-api.com/v2/questions");

      if (!response.ok) {
        throw new Error("Response was not ok :(");
      }

      const data: [] = await response.json();

      const questions: QuestionField[] = data.map((value: any) => ({
        questionName: value.question.text,
        questionNumber: value.index,
        correctAnswer: value.correctAnswer,
        incorrectAnswers: value.incorrectAnswers,
      }));

      setQuestionsData(questions);
      setQuestionNumber(0);
      setCorrectAnswers(0);
      setIsFinished(false);
      setIsStarted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return !isFinished ? (
    <>
      {!isStarted && (
        <button
          onClick={() => {
            fetchQuestions();
          }}
        >
          Start Quiz
        </button>
      )}
      <div className="question">
        {questionsData.map(
          (value, index) =>
            questionNumber === index && (
              <Question
                key={index}
                questionName={value.questionName}
                questionNumber={index + 1}
                correctAnswer={value.correctAnswer}
                incorrectAnswers={value.incorrectAnswers}
                onAnswerSubmitted={(correct) => {
                  handleOnAnswerSubmitted(correct);
                }}
              />
            )
        )}
      </div>

      {isStarted && <p>Correct Answers: {correctAnswers}</p>}
    </>
  ) : (
    <>
      <h1>QUIZ FINISHED</h1>
      <h2>You Scored: {correctAnswers}</h2>
      <button
        onClick={() => {
          fetchQuestions();
        }}
      >
        Play again?
      </button>
    </>
  );
};

export default Quiz;
