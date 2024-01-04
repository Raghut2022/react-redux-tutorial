import React, { useState, useEffect, useReducer, useRef, useLayoutEffect } from "react";
import axios from "axios";

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1, showText: state.showText };
    case 'toggleShowText':
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

const Hello = () => {
  const [posts, setPosts] = useState([]);
  const [numbers, setNumbers] = useState(0);
  const [messag, setMessag] = useState("raghu");
  const [showText, setShowText] = useState(true);
  const [data, setData] = useState("");
  const [email, setEmail] = useState('');
  const [state, dispatch] = useReducer(counterReducer, { count: 0, showText: true });
  const inputRef = useRef(null);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    console.log(divRef.current.value);
  }, []);

  useEffect(() => {
    divRef.current.value = "hello";
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
    
    const timeoutId = setTimeout(() => {
      handleIncrement();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        console.log("new", response.data);
        setData(response.data[9].email);
      });
  }, []);

  let handleChange = (event) => {
    const newValue = event.target.value;
    setMessag(newValue);
    console.log("@@@@", setMessag);
  };

  const onClick = () => {
    inputRef.current.value = "";
  };

  useEffect(() => {
    console.log(222);
  }, []);

  function handleIncrement() {
    console.log("@@@", numbers);
    setNumbers(numbers + 8);
  }

  function convertToRomanNumeral(number) {
    // Roman numeral symbols and their corresponding values
    const romanSymbols = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
    const romanValues = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

    let result = '';

    // Iterate through the Roman numeral symbols and build the result
    for (let i = romanValues.length - 1; i >= 0; i--) {
      while (number >= romanValues[i]) {
        result += romanSymbols[i];
        number -= romanValues[i];
      }
    }

    // Display the result
    document.getElementById("result").innerText = "Roman Numeral: " + result;
  }

  return (
    <>
      <div>
        <label htmlFor="numberInput">Enter a number:</label>
        <input
          type="number"
          id="numberInput"
          onChange={(e) => convertToRomanNumeral(e.target.value)}
        />
        <p id="result"></p>
      </div>
      <div>
        <input
          ref={divRef}
          value="raghu"
          style={{ width: "400px", height: "50px" }}
        />
      </div>
      <div>
        <input type="text" placeholder="enter something" ref={inputRef} />
        <button onClick={onClick}>change</button> <br />
        <input placeholder="enter" type="text" onChange={handleChange} />
        {messag}
        <button
          onClick={() => {
            setNumbers(numbers + 1);
            setShowText(!showText);
          }}
        >
          click me
        </button>
        {numbers}
        {showText && <h4>helloworld</h4>}
        <h3>Posts Table</h3>
      </div>
      <div style={{ maxHeight: "300px", overflow: "auto" }}>
        <table>
          <thead>
            <tr style={{ borderCollapse: "collapse", width: "100%" }}>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Body</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td style={tableCellStyle}>{post.id}</td>
                <td style={tableCellStyle}>{post.title}</td>
                <td style={tableCellStyle}>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p>Count: {state.count} </p>
        <button
          onClick={() => {
            dispatch({ type: "INCREMENT" });
            dispatch({ type: "toggleShowText" });
          }}
        >
          Increment
        </button>
        {state.showText && <p>welcome</p>}
      </div>
      <h3>{numbers}</h3>
      <p>{data} hello</p>
      <button onClick={handleIncrement}>Increment</button> <br />
    </>
  );
};

const tableHeaderStyle = {
  border: "1px solid #000",
  color: "blue",
  padding: "8px",
  textAlign: "left",
};

const tableCellStyle = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "left",
};

export default Hello;