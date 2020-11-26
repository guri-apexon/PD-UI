import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dashboard } from "../Dashboard/dashboardSlice";
import AddProtocol from "./AddProtocol";
const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(dashboard);
  const [state, setState] = useState({
    custom: false,
  });

 
  useEffect(() => {
    console.log("componentDidMount :", dashboardData.value);
    dispatch({ type: "DASHBOARD_ASYNC_SAGA" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (variant) => {
    setState({ ...state, [variant]: true });
  };

  const handleClose = (variant) => {
    setState({ ...state, [variant]: false });
  };
  const handleSave = (variant) => {
    console.log("variant :", variant);
    setState({ ...state, custom: false });
  };

  return (
    <div className="dashboard-parent">
      Dashboard
      <AddProtocol
        state={state}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleSave={handleSave}
      />
      {/* <Footer
  buttonProps={[
    {
      label: 'Terms of Use',
      href: 'https://www.iqvia.com/about-us/terms-of-use',
      target: '_blank',
    },
    {
      label: 'Privacy Policy',
      href: 'https://www.iqvia.com/about-us/privacy/privacy-policy',
      target: '_blank',
    },
  ]}
  maxWidth={1600}
/>; */}
    </div>
  );
};

// const mapDispatch = dispatch => {
//     return{
//         dashboardAsync:()=>{
//         }
//     }
// }
// const mapStateToProps = state =>  ({
//     count: state.dashboard.value
// })
// export default  connect(null, mapDispatch)(Dashboard);

export default Dashboard;
