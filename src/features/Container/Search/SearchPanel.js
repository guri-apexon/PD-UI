
import Panel from 'apollo-react/components/Panel';
import Typography from 'apollo-react/components/Typography';
import classNames from 'classnames';
import React, {useState} from 'react';
import { CompositeAccordion } from './CompositeAccordion';
import data from './Data/row.data';
import SearchIcon from 'apollo-react-icons/Search';
import Search from 'apollo-react/components/Search';
import Button from 'apollo-react/components/Button';
import CustomCard from './CustomCard';
import searchData from './Data/search.metadata';
import CollapseCard from './CollapseCard';
import Link from 'apollo-react/components/Link';


export default class SearchPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { seachValue: [] };         
    }
      
    
    render() {

        const clearAllCheckbox = () =>{
            console.log(this.state["searchValue"])
            this.state["searchValue"] = [];
            this.setState({ searchValue:[] });
        };  
       
        let protocols = data.protocols.length;
        let maxRecordsPerPage = 2;
        let noOfProtocolsPerPages = (protocols > 0 ?
            ((protocols > maxRecordsPerPage) ?
                (protocols / maxRecordsPerPage) : protocols)
            : 0);

            
           
     
        return (
                <div id="searchPanel">
                <Panel width="18%" >
                        <Typography variant="body2" gutterBottom>
                            {
                                <div className="width100">
                                    <span>Refine your Search</span>  
                                    <div className="floatRight marginRight10">
                                        <Link  onClick={ clearAllCheckbox } size="small" > Clear All</Link>
                                    </div>
                                </div>}

                        </Typography>
                        <div >
                            {searchData.sections.map((section, index) => (
                                <CollapseCard state={this.state} key={section.sectionId} section={section} index={index} />
                            ))}
                        </div>
                    </Panel>
                <Panel width="80%" hideButton >
                            <Typography variant="body1" gutterBottom>
                                <div className="width100">
                                    <div className="width100 marginTop">
                                        <div className="width100 " >
                                            <div className="width150px marginLeft10">
                                                <span>Showing 1 - {noOfProtocolsPerPages} of {protocols} </span>
                                            </div>
                                            <div className="width5">
                                                <SearchIcon style={{ color: "#0557d5" }} size="small" />
                                            </div>
                                            <div id="chip">

                                            </div>
                                            {
                                                data.protocols.map(protocol => (
                                                    <div>
                                                        <CompositeAccordion data={protocol} />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </Typography>
                    </Panel>
                </div>
            
        );
    }
}