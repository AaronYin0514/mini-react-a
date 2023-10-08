import { ReactDOM, Component } from "../which-react";
import "./index.css";

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>{props.name}</p>
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

// function FragmentComponent() {
//   return (
//     <ul>
//       <React.Fragment>
//         <li>part1</li>
//         <li>part2</li>
//       </React.Fragment>
//     </ul>
//   );
// }

const jsx = (
  <div className="border">
    <h1>react1</h1>
    <a href="https://github.com/bubucuo/mini-react">mini react</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    {/* <FragmentComponent /> */}
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(jsx);
