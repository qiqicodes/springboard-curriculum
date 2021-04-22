import React, { useState } from "react";
import "../assets/EightBall.css";

// onClick{() => setChange{ramdomize default props. msg=prop.msg, color=prop.color}}

//randomize answers fucntion, 1. random indexing 2. output array item
const random = (array) => {
  const randomIndex = Math.floor(Math.random * array.length);
  return arr[randomIndex];
};

const EightBall = (props) => {
  // init state: “Think of a Question” bg-color: black
  const [msg, setMsg] = useState("Think of a Question");
  const [color, setColor] = useState("black");

  return (
    <div className="EightBall">
        <h3>{ msg }</h3>
    </div>
  );
};

EightBall.defaultProps = {
  answer: [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
  ],
};

export default EightBall;
