import type { NextPage } from 'next';
import styles from '../../styles/home.module.css';
import LayoutDefault from "../../layout/layout.default";

const Home: NextPage = () => {
  return (
    <LayoutDefault title="Home">
      <div>Home</div>
    </LayoutDefault>
  )
}

export default Home;
