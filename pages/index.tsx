import {Typography} from "antd";
// import ExampleButton from "generals/Button/ExampleButton";
import ExampleToggle from "generals/Toggle/ExampleToggle";
import Layout, { Content } from "antd/lib/layout/layout";
import HomeLayout from "@layout/Home/HomeLayout";
import HeaderLanding from "@module/LandingPage/HeaderLanding";

const {Title} = Typography;
const App = () => (
  <Layout style-={{ backgroundColor: 'white' }}>
    <HeaderLanding />
    <Content>
      <HomeLayout />
    </Content>
  </Layout>
);
export default App;
