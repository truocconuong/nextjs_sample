import {Typography} from "antd";
// import ExampleButton from "generals/Button/ExampleButton";
import ExampleToggle from "generals/Toggle/ExampleToggle";
import Layout, { Content } from "antd/lib/layout/layout";
import HomeLayout from "@layout/Home/HomeLayout";

const {Title} = Typography;
const App = () => (
  <Layout>
  {/* <Header style={{height:'80px'}}></Header> */}
  <Content>
    <HomeLayout/>
  </Content>
</Layout>
);
export default App;
