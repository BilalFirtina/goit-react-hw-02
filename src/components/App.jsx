import "./App.css";
import Options from "./Options/Options.jsx";
import { useState, useEffect } from "react";
import Feedback from "./Feedback/Feedback.jsx";
import Notification from "./Notification/Notification.jsx";
import Description from "./Description/Description.jsx";

function App() {
  const localVotes = JSON.parse(localStorage.getItem("votes"))
    ? JSON.parse(localStorage.getItem("votes"))
    : {
        Good: 0,
        Neutral: 0,
        Bad: 0,
      };
  const [votes, setVotes] = useState(localVotes);

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  const updateFeedback = (feedbackType) => {
    setVotes((votes) => ({
      ...votes,
      [feedbackType]: votes[feedbackType] + 1,
    }));
  };

  const handleReset = () => {
    setVotes({
      Good: 0,
      Neutral: 0,
      Bad: 0,
    });
  };

  const totalFeedback = votes.Good + votes.Neutral + votes.Bad;
  const positivePercentage =
    totalFeedback > 0 ? Math.round((votes.Good / totalFeedback) * 100) : 0;
  const options = ["good", "neutral", "bad"];
  return (
    <>
      <Description />
      <Options
        options={options}
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetButton={handleReset}
      />

      {totalFeedback > 0 ? (
        <Feedback
          good={votes.Good}
          neutral={votes.Neutral}
          bad={votes.Bad}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
