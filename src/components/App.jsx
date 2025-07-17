import "./App.css";
import Options from "./Options/Options.jsx";
import { useState, useEffect } from "react";
import Feedback from "./Feedback/Feedback.jsx";
import Notificationn from "./Notification/Notification.jsx";

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
  const options = ["Good", "Neutral", "Bad"];
  return (
    <>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
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
        <Notificationn />
      )}
    </>
  );
}

export default App;
