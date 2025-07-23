import css from "./Options.module.css";

const Options = ({ options, updateFeedback, totalFeedback, resetButton }) => {
  return (
    <div>
      {options.map((option) => {
        return (
          <button
            key={option}
            className={css.button}
            onClick={() => updateFeedback(option.toLowerCase())}
          >
            {option}
          </button>
        );
      })}
      {/* Koşullu olarak Reset butonunu göster */}
      {totalFeedback > 0 && (
        <button className={css.button} onClick={resetButton}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Options;
