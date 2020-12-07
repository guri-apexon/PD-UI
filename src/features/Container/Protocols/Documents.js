import React, {useEffect, useState} from 'react'
import DocumentsTable from '../../Components/Dashboard/DocumentsTable/DocumentsTable'
import { useSelector, useDispatch } from "react-redux";
import { prtocolsList } from "../Dashboard/dashboardSlice";
import Grid from "apollo-react/components/Grid";
import queryString from "query-string";
import './Documents.scss';
import {
    useLocation
  } from "react-router-dom";
const Documents = () =>{
    const dispatch = useDispatch();
    const location = useLocation();
    const protocolData = useSelector(prtocolsList);
    const [rows, setRows] =useState([])
    useEffect(() => {

        let params = location && location.search;
        const parsed = queryString.parse(params);
    if ("protocolId" in parsed) {
        let filterrow= protocolData && protocolData.filter(item=> item.protocolId == parsed.protocolId )
        setRows(filterrow);
    }
    }, [prtocolsList])
    return(
        <div className="document-tab">
             <Grid item xs={12}>
             <DocumentsTable initialsRow={rows} />
             </Grid>  
        </div>
    )
}

export default Documents;