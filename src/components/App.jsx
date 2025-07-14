import Description from "./Description/Description.jsx";
import "./App.css";
import Options from "./Options/Options.jsx";
import { useState } from "react";
import Feedback from "./Feedback/Feedback.jsx";
import Notificationn from "./Notification/Notification.jsx";
import { useEffect } from "react";

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
    if (feedbackType === "Reset") {
      setVotes({ Good: 0, Neutral: 0, Bad: 0 });
    }
    setVotes((votes) => ({
      ...votes,
      [feedbackType]: votes[feedbackType] + 1,
    }));
  };
  const totalFeedback = votes.Good + votes.Neutral + votes.Bad;
  const options = ["Good", "Neutral", "Bad"];
  if (totalFeedback > 0) options.push("Reset");
  return (
    <>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <Options options={options} updateFeedback={updateFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          good={votes.Good}
          neutral={votes.Neutral}
          bad={votes.Bad}
          total={totalFeedback}
        />
      ) : (
        <Notificationn />
      )}
    </>
  );
}

export default App;
