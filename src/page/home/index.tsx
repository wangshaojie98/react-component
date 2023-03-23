import {
  Link,
} from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={'/component'}>component</Link>
      { Array(30000).fill(0).map((_, idx) => <li key={idx}>{idx}</li>)}
    </div>
  )
}

export default Home