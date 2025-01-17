import { useState } from "react";
import { questions } from "@/lib/questions";
import { AssessmentQuestion } from "@/components/AssessmentQuestion";
import { AssessmentResults } from "@/components/AssessmentResults";

type Answers = Record<string, number>;

const Assessment = () => {
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const currentPillar = questions[currentPillarIndex];
  const allQuestions = currentPillar.categories.flatMap(category => category.questions);
  const currentQuestion = allQuestions[currentQuestionIndex];
  
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentPillarIndex < questions.length - 1) {
      setCurrentPillarIndex(currentPillarIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowResults(true);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setCurrentPillarIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const progress = ((currentPillarIndex * allQuestions.length + currentQuestionIndex + 1) / 
    (questions.reduce((acc, pillar) => 
      acc + pillar.categories.reduce((sum, category) => 
        sum + category.questions.length, 0), 0))) * 100;

  return (
    <div 
      className="min-h-screen p-8 md:p-12 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1541417904950-b855846fe074?q=100&w=3840&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      
      {showResults ? (
        <AssessmentResults 
          answers={answers}
          onStartOver={handleStartOver}
        />
      ) : (
        <AssessmentQuestion
          pillarName={currentPillar.name}
          category={currentQuestion.category}
          questionText={currentQuestion.text}
          progress={progress}
          currentValue={answers[currentQuestion.id] || 0}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Assessment;