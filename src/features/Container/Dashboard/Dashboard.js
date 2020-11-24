import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'apollo-react/components/Button';
import Footer from 'apollo-react/components/Footer';


class Dashboard extends Component {
    constructor(props){
        super(props);
    }


    componentDidMount(){
    console.log('componentDidMount :', );
    this.props.dashboardAsync();
    }

render(){
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



}
const mapDispatch = dispatch => {
    return{
        dashboardAsync:()=>{
            dispatch({type:'DASHBOARD_ASYNC_SAGA'})
        }
    }
}

export default  connect(null, mapDispatch)(Dashboard);