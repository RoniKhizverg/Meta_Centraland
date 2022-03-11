import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Link
} from 'react-router-dom';

const URL = 'http://localhost:4000/plots'

const Table = () => {
    const[emptyPlots,setEmptyPlots] = useState('hiddeninput');

    const [plots, setPlots] = useState([]);

    useEffect(() => {
        
        getData()
    }, [])

    const getData = async () => {
        var currentPlots=[];
        var index=0;
        const response = await (await axios.get(URL)).data
        for(var i=0;i<response.length;i++)
        {
            if(localStorage.getItem('loguserid') === response[i].userid)
            {
                currentPlots[index++] = JSON.parse(JSON.stringify(response[i]));
            }
        
    }
    if(currentPlots.length !== 0)
    {
        setEmptyPlots("hiddeninput")
    }
    else
    {
        setEmptyPlots("visability")
    }
    setPlots(currentPlots);

}

   

    const renderHeader = () => {
        if(plots.length === 0)
    {
        return(
            <th className={emptyPlots}>You have no plots!!!</th>
        )
    }
    else{
        let headerElement = ['avaibleForSale', 'ownerName', 'description', 'price']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}

    const renderBody = () => {
        
        return plots && plots.map(({ _id,avaibleForSale, ownerName, description, price }) => {
            avaibleForSale= avaibleForSale+""
            return (
                <tr key={_id}>
                    <td>{avaibleForSale}</td>
                    <td>{ownerName}</td>
                    <td>{description}</td>
                    <td>{price}</td>
                </tr>
            )
        })
    }

    return (
        <>
        <br></br>
        <br></br>
            <table id='plot'className="center">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
                
            </table>

            
        </>
    )
}


export default Table