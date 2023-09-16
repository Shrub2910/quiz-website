interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Props {
  questionName: string;
  questionNumber: number;
  correctAnswer: string;
  incorrectAnswers: string[];
  onAnswerSubmitted: (correct: boolean) => void;
}

const Question = ({
  questionName,
  questionNumber,
  correctAnswer,
  incorrectAnswers,
  onAnswerSubmitted,
}: Props) => {
  const shuffleArray = (array: Answer[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const correctAnswerObject: Answer = {
    text: correctAnswer,
    isCorrect: true,
  };

  const incorrectAnswerObjects: Answer[] = incorrectAnswers.map(
    (incorrectAnswer) => ({
      text: incorrectAnswer,
      isCorrect: false,
    })
  );

  const allAnswers = shuffleArray([
    ...incorrectAnswerObjects,
    correctAnswerObject,
  ]);

  return (
    <>
      <div className="question">
        <h2>Question {questionNumber}</h2>
        <h3>{questionName}</h3>

        <ul>
          {allAnswers.map((answer, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  answer.isCorrect
                    ? onAnswerSubmitted(true)
                    : onAnswerSubmitted(false);
                }}
              >
                {answer.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Question;
