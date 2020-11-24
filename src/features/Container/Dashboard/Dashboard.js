import React, { useEffect } from 'react';
import Button from 'apollo-react/components/Button';
import { useSelector, useDispatch } from 'react-redux';
import {dashboard} from '../Dashboard/dashboardSlice'

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(dashboard);

    useEffect(()=>{
        console.log('componentDidMount :',dashboardData.value );
        dispatch({type:'DASHBOARD_ASYNC_SAGA'})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return(
        <div className='dashboard-parent'>
            Dashboard
            <Button variant="primary">Start!</Button>
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
    )
}




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

export default  Dashboard;