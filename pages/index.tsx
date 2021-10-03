import { Spin, Typography } from "antd";
// import ExampleButton from "generals/Button/ExampleButton";
import ExampleToggle from "generals/Toggle/ExampleToggle";
import Layout, { Content } from "antd/lib/layout/layout";
import HomeLayout from "@layout/Home/HomeLayout";
import HeaderLanding from "@module/LandingPage/HeaderLanding";
import AuthHoc from "./AuthHoc";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CategoryActions } from "@redux/actions";
import { NotificationWarning } from "@generals/notifications";
import YourLegacyLayout from "@layout/YourLagacy/YourLegacyLayout";
import HeaderDashboard from "@module/MyAccount/HeaderDashboard";

const { Title } = Typography;
const App = () => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(null);

  const checkAuthentication = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(CategoryActions.getCategoriesData(token, (res) => {
        if (res?.statusCode === 401) {
          localStorage.removeItem("accessToken");
          NotificationWarning("Your session has expired, please login again!");
          dispatch(CategoryActions.resetCategoryData());
          setAuthenticated(false);
        } else {
          setAuthenticated(true)
        }
      }));
    }else{
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);
  return (
    authenticated === null ? <Spin />
      : (
        authenticated === false ?
          <Layout style-={{ backgroundColor: 'white' }}>
            <HeaderLanding />
            <Content>
              <HomeLayout />
            </Content>
          </Layout> :
          <div>
            <HeaderDashboard />
            <YourLegacyLayout />
          </div>
      )

  )
}

export default App;
