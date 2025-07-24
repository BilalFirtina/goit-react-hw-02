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
        good: 0,
        neutral: 0,
        bad: 0,
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
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = votes.good + votes.neutral + votes.bad;
  const positivePercentage =
    totalFeedback > 0 ? Math.round((votes.good / totalFeedback) * 100) : 0;
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
          good={votes.good}
          neutral={votes.neutral}
          bad={votes.bad}
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
