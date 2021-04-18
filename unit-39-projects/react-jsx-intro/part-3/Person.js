const Person = (props) => {
    let hobbies = props.hobbies.map(el => <li> {el} </li>)
    let voteMessage = props.age >= 18 ? "Please go vote!" : "You must be 18.";

  return (
    <div>
        <p>Learn some information about this person</p>

        <ul>
            <li><b>Name: </b>{props.name.slice(0,6)}</li>
            <li><b>Age: </b>{props.age}</li>
            <ul>
            <b>Hobbies：</b>
            {hobbies}
            </ul>
        </ul>
        <h3> {voteMessage}</h3>
  </div>
  )
};
