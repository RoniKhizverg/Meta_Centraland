
import '../MetaCentraland/MetaCentraland.css'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const CreateMap = () =>{  // deifine the variables
    
    
    const [,setState] = useState('')
    const[cellStateDead] = useState(false);
    const[cellStateROAD] = useState("road");
    const[cellStatePARK] = useState("park");
    const[cellStateEMPTYCELL] = useState("empty");
    const[cellStateCHEEPPLOT] = useState("cheepPlot");
    const[cellStateMEDIOCREPLOT] = useState("mediocrePLOT");
    const[cellStateHIGHPLOT] = useState("highPlot");
    const[,setUser] = useState('');
    const[usertype,setUserType] = useState('');
    const [cells,setCells] = useState([[]]);

        
      
    useEffect(() => {

    const columnsAmount = 200;
    const rowsAmount = 200;
    var colorList = {"<215$": 'red', "<150$": 'yellow', "<50$": 'green'};   //define the map legend
    const legend= localStorage.getItem("legend");
    //console.log(legend)
       if(legend==='1'){
        Colorize(colorList);
        localStorage.setItem("legend",0);
    }

    const getLogIn = async () =>{
    try
    {
        const getUserLogIn = (await axios.get('http://localhost:4000/logsIn')).data;    //get the current register user
     if(getUserLogIn.length === 0)
     {

            setUser("Welcome Guest");
            setUserType("guest");
     }
     else
     {
        const getSignUpUsers = (await axios.get('http://localhost:4000/signupUsers')).data; //get the all registerd users
        const userid = localStorage.getItem('loguserid');
        for(var i=0; i < getSignUpUsers.length;i++)
        {
            if(getSignUpUsers[i].ID === userid && getUserLogIn[0]!== undefined) 
            {
                localStorage.setItem("user_id",getUserLogIn[0]._id);
                 setUser(getSignUpUsers[i].name +" has " + getSignUpUsers[i].wallet + " $" );
                 setUserType(getUserLogIn[0].userType);
            }
        }
     }
            }catch(error) {
         
        console.log(error);
        
    }
        
    
    
};
    getLogIn();
    setCells(initializeCells());
    function initializeCells (){   //creating the map
        let cells =[]
        for (let columnIndex = 0; columnIndex < columnsAmount; columnIndex++) {
        cells[columnIndex] = [];
        for (let rowIndex = 0; rowIndex < rowsAmount; rowIndex++) {
            if(((rowIndex %50 <30 && rowIndex % 50> 19 )&& (columnIndex % 50<30 && columnIndex % 50 >20)) ){
                cells[columnIndex][rowIndex] = "park";
            }
           else if((columnIndex%50<2 && columnIndex>10) || (columnIndex% 25 <1 && columnIndex>10)|| (rowIndex%50<2 && rowIndex>10) || (rowIndex% 25 <1 && rowIndex>10)|| (columnIndex === 199) ||( rowIndex === 199)|| (columnIndex === 0) ||( rowIndex === 0)){
            cells[columnIndex][rowIndex] = "road";
           }
            else {
                        cells[columnIndex][rowIndex] = false;
    
                    }
            }

        }
       
      axios.get('http://localhost:4000/plots')   //get the all plots and add them to the map
     .then((response) => {
         const data = response.data;
         const length = data.length;

    for(let i=0; i< length;i++)
                {
                 if((data[i].price <50)&& (cells[data[i].column][data[i].row]===false))
                    cells[data[i].column][data[i].row] = "cheepPlot";
                
                    else if((data[i].price >50) && (data[i].price < 150)&& (cells[data[i].column][data[i].row]===false))
                    cells[data[i].column][data[i].row] = "mediocrePLOT";
                
                    else if(data[i].price >150 && (cells[data[i].column][data[i].row]===false))
                    {
                    cells[data[i].column][data[i].row] = "highPlot";
                    }
                }
    const newCellsState = cells;
    setState(newCellsState)
          
    })   
        return cells;
        
    };
},[]);


   
   


    function toggleCellState(columnIndex, rowIndex) {  //when we click on the plot in the map

        axios.get('http://localhost:4000/plots')
       .then((response) => {
         const data = response.data;
         const length = data.length;
        for(var i=0; i < length; i++)
        {

            if((Number(data[i].row) === rowIndex) && (Number(data[i].column) === columnIndex) && (usertype === "buyer")) //if the user is buyer
            {
                localStorage.setItem("plot",data[i]._id);
                localStorage.setItem("ownerNameId", data[i].userid);
                if(data[i].avaibleForSale === false)   //if the plot is not for sale so we enter the pop up as guest
                {
                    window.location ="/guestpopup"

                }
                else
                {
                window.location ="/buyerplotpopup";
                }
            }
            else if((Number(data[i].row) === rowIndex) && (Number(data[i].column) === columnIndex) && (usertype === "seller")) //if the user is seller
            {
                
                localStorage.setItem("plot",data[i]._id);
                localStorage.setItem("ownerNameId", data[i].userid);

                const selleruserid= localStorage.getItem("loguserid");
                const plotOwnerID= localStorage.getItem("ownerNameId");

                if(selleruserid !== plotOwnerID)   //the user cant edit plot if the plot isnt belong to him
                {
                    window.location ="/guestpopup"
                }
                else{
                    window.location ="/sellerpopup";
                    }
            }
             else if(((Number(data[i].row) === rowIndex) && (Number(data[i].column) === columnIndex) && (usertype === "guest"))) //if the user is guest
            {
                localStorage.setItem("plot",data[i]._id);
                window.location ="/guestpopup";
            }
        }
    })
    
        const newCellsState = cells;       
        newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex];  //change the color when we clicked on the plot
        setState({
            newCellsState
        })
    }

      function renderCells() { //define the coloring of each square
        return (           
            <div className = "MetaCentraland__cells">  {
                cells.map((rows, columnIndex) => {
                    
                    return renderColumn(rows, columnIndex)
                })
            } 
           </div>
           

            
        );
    
}

    function renderColumn(rows, columnIndex) {       //define the coloring of each square 
        return ( 
            
            <div className = "MetaCentraland__column"
            key = {
                `column_${columnIndex}`
            }>  {
                rows.map((cellState, rowIndex) => {
                    const cellModifier = cellColoring(cellState);
                    return <div
                    className = {
                        `MetaCentraland__cell MetaCentraland__cell--${cellModifier}`
                    }
                    key = {
                        
                        `cell_${columnIndex}_${rowIndex}`
                    }
                    onClick = {
                        () => toggleCellState(columnIndex, rowIndex)
                    }
                    />
                })
            } 
                        </div>                       
        )
    }


        return (             
            <TransformWrapper >              
                <br></br>
        <br></br>
            <TransformComponent style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
            <div> 
            <div className = "MetaCentraland"  > {
                renderCells()     
            } 
            </div>
            </div>
            </TransformComponent>
            </TransformWrapper>
                        
        );

        
        
    function Colorize (colorList) {   //creating the map's legend
            var container = document.getElementById('root');
          
            for (var key in colorList) {
                var boxContainer = document.createElement("DIV");
                var box = document.createElement("DIV");
                var label = document.createElement("SPAN");
        
                label.innerHTML = key;
                box.className = "box";
                box.style.backgroundColor = colorList[key];
        
                boxContainer.appendChild(box);
                boxContainer.appendChild(label);
        
                container.appendChild(boxContainer);
        
           }
        }

   function cellColoring(cellState) {   //define the 'status' of each cell
    let cell = "";
    if (cellState === cellStateDead) {

        cell = "dead";
    }
    if (cellState === cellStateROAD) {

        cell = "road";
    }
    if (cellState === cellStatePARK) {

        cell = "park";
    }
    if (cellState === cellStateCHEEPPLOT) {

        cell = "cheepPlot";
    }
    if (cellState === cellStateMEDIOCREPLOT) {

        cell = "mediocrePlot";
    }
    if (cellState === cellStateHIGHPLOT) {

        cell = "highPlot";
    }
    if (cellState === cellStateEMPTYCELL) {

        cell = "empty";
    }
    return cell;

    }
}
export default CreateMap

