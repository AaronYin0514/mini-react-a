import {
  ReactDOM,
  Component,
  useReducer,
  useState,
  useEffect,
  useLayoutEffect,
} from "../which-react";
import "./index.css";

function FunctionComponent(props) {
  const [count, setCount] = useReducer((x) => x + 1, 0);
  const [count2, setCount2] = useState(4);

  useEffect(() => {
    console.log("useEffect无依赖");
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect无依赖");
  }, []);

  useEffect(() => {
    console.log("useEffect依赖count");
  }, [count]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect依赖count2");
  }, [count2]);

  return (
    <div className="border">
      <p>{props.name}</p>
      <button onClick={() => setCount()}>{count}</button>
      <button onClick={() => {
        if (count2 === 0) {
          setCount2(4);
        } else {
          setCount2(count2 - 2);
        }
      }}>{count2}</button>
      {count % 2 ? <div>omg</div> : <span>123</span>}
      <ul>
        {[0, 1, 2, 3, 4].map((item) => {
          return count2 >= item ? <li key={item}>{item}</li> : null;
        })}
      </ul>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        我是文本
      </div>
    );
  }
}

function FragmentComponent() {
  return (
    <ul>
      <>
        <li>part1</li>
        <li>part2</li>
      </>
    </ul>
  );
}

const jsx = (
  <div className="border">
    <h1>react1</h1>
    <a href="https://github.com/bubucuo/mini-react">mini react</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    <FragmentComponent />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(jsx);
