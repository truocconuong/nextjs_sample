import {Typography} from "antd";
// import ExampleButton from "generals/Button/ExampleButton";
import ExampleToggle from "generals/Toggle/ExampleToggle";
import InvestmentsLayout from "@layout/Investments";
import BusinessInterestsLayout from "@layout/BusinessInterests";

const {Title} = Typography;
const App = () => (
  <div
  // style={{
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: "100vh",
  // }}
  >
    {/* <Title>Protect your legacy in Minutes</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title> */}

    {/* <ExampleButton /> */}
    <BusinessInterestsLayout />
    {/* <ExampleToggle /> */}
  </div>
);
export default App;
