const Feedback = ({ good = 0, neutral = 0, bad = 0, total = 0 }) => {
  const positivePercentage = total > 0 ? Math.round((good / total) * 100) : 0;

  return (
    <div>
      <p>Good:{good}</p>
      <p>Neutral:{neutral}</p>
      <p>Bad:{bad}</p>
      <p>Total:{total}</p>
      <p>Positive:{positivePercentage}%</p>
    </div>
  );
};

export default Feedback;
