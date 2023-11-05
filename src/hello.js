import React, { useState, useEffect, useReducer } from "react";

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
  const [state, dispatch] = useReducer(counterReducer, { count: 0, showText:true });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data)); // Change 'posts' to 'data'

    const timeoutId = setTimeout(() => {
      handleIncrement();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  let handleChange = (event) =>{
    const newValue = event.target.value;
    setMessag(newValue)
    console.log("@@@@", setMessag)
  }

  useEffect(() => {
    console.log(222);
  }, []);

  function handleIncrement() {
    console.log("@@@", numbers);
    setNumbers(numbers + 8);
  }

  return (
    <>
    <div>
     <input placeholder="enter" type="text" onChange={handleChange}></input>
     {messag}
     <button onClick={()=> { setNumbers(numbers+1); setShowText(!showText);}}>click me</button>
     {numbers}
     {showText && <h4>helloworld</h4>}
      <h3>Posts Table</h3>
      </div>
      <div>
      <p>Count: {state.count} </p>
      <button onClick={() => {dispatch({ type: 'INCREMENT' }); dispatch({type: 'toggleShowText'})}}>Increment</button>
      {state.showText && <p>welcome</p>}
    </div>
      <table>
        <thead>
          <tr style={{ borderCollapse: "collapse", width: "100%" }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Title</th>
            <th style={tableHeaderStyle}>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => ( // Change 'item' to 'post'
            <tr key={post.id}>
              <td style={tableCellStyle}>{post.id}</td>
              <td style={tableCellStyle}>{post.title}</td>
              <td style={tableCellStyle}>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{numbers}</h3>
      <button onClick={handleIncrement}>Increment</button> <br></br>
    </>
    
  );
};
const tableHeaderStyle = {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "left",
  };
  
  const tableCellStyle = {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "left",
  };

export default Hello;
