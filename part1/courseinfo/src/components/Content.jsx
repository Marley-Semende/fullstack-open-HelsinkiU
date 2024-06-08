const Content = ({
  part1,
  exercises1,
  part2,
  exercises2,
  part3,
  exercises3,
}) => {
  return (
    <div>
      <p>
        {part1} {exercises1}
        <br />
        {part2} {exercises2}
        <br />
        {part3} {exercises3}
      </p>
    </div>
  );
};
export default Content;
