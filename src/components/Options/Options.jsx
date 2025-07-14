import css from "./Options.module.css";

const Options = ({ options, updateFeedback }) => {
  return (
    <div>
      {options.map((option) => {
        return (
          <button
            key={option}
            className={css.button}
            onClick={() => updateFeedback(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
