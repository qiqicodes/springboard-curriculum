const App = () => (
  <div>
    <Tweet
      name="Lala"
      username="lalaland"
      date={new Date().toDateString()}
      message="what an awesome day!"
    />
    <Tweet
      name="Kiki"
      username="kikiland"
      date={new Date().toDateString()}
      message="oh yeah!"
    />
    <Tweet
      name="Boaa"
      username="boaaland"
      date={new Date().toDateString()}
      message="fun day!"
    />
  </div>
);
