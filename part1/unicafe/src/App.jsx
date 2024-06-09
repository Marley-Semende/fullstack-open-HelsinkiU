import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine
        text="total"
        value={props.good + props.neutral + props.bad}
      />
      <StatisticLine
        text="average"
        value={
          (props.good - props.bad) / (props.good + props.neutral + props.bad)
        }
      />
      <StatisticLine
        text="positive"
        value={(props.good / (props.good + props.neutral + props.bad)) * 100}
      />
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
