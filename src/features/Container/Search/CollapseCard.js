import React from 'react';
import Collapsible from 'react-collapsible';
import CustomCard from './CustomCard'


const CollapseCard = ({state, section , index}) => {
        return(
            <Collapsible trigger={section.sectionName}  >
                <CustomCard state={state} key={section.sectionId} section={section} index={index} />
            </Collapsible>
        );
}

export default CollapseCard;
