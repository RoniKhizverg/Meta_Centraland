
import '../MetaCentraland/MetaCentraland.css'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";





const CreateMap = () =>{

     let colorize=[];

    
    const [columnsAmount] = useState(200);
    const [rowsAmount] = useState(200);
    const [state,setState] = useState('')
    const[cellStateAlive] = useState(true);
    const[cellStateDead] = useState(false);
    const[cellStateROAD] = useState("road");
    const[cellStatePARK] = useState("park");
    const[cellStateEMPTYCELL] = useState("empty");
    const[cellStateCHEEPPLOT] = useState("cheepPlot");
    const[cellStateMEDIOCREPLOT] = useState("mediocrePLOT");
    const[cellStateHIGHPLOT] = useState("highPlot");
    const[cells] = useState(initializeCells());
    const[user,setUser] = useState('');
    const[usertype,setUserType] = useState('');

        
        
    useEffect(() => {
    
            
        var colorList = {"<215$": 'red', "<150$": 'yellow', "<50$": 'green'};

    colorize = function(colorList) {
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

    colorize(colorList);

     axios.get('http://localhost:4000/logsIn')
     .then((response) => {

         const data = response.data;
         var length = data.length;
         if(length===0 || !localStorage.getItem('loguserid'))
         {
            setUser("Welcome Guest");
            setUserType("guest");

         }
         else{
             axios.get('http://localhost:4000/signupUsers')
     .then((response) => {
        const userid = localStorage.getItem('loguserid');
         const data1 = response.data;
         var length1 = data1.length;
         for(var i=0; i < length1; i++)
         {
            if(data1[i].ID === userid )
            {
                localStorage.setItem("user_id",data[0]._id);
                 setUser(data1[i].name +" has " + data1[i].wallet + " $" );
                 setUserType(data1[i].userType);
                 console.log(data1[i].userType)
            }
      }

   
  });
}
});


},[]);


   
   function initializeCells() {
        let cells = [];

       
        

        for (let columnIndex = 0; columnIndex < columnsAmount; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < rowsAmount; rowIndex++) {

                

                if (((rowIndex >= 20) && (rowIndex <= 30) && (columnIndex >= 20) && (columnIndex <= 30))) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 70) && (rowIndex <= 80) && (columnIndex >= 20) && (columnIndex <= 30)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 120) && (rowIndex <= 130) && (columnIndex >= 20) && (columnIndex <= 30)) {
                    cells[columnIndex][rowIndex] =cellStatePARK;

                } else if ((rowIndex >= 170) && (rowIndex <= 180) && (columnIndex >= 20) && (columnIndex <= 30)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if (((rowIndex >= 20) && (rowIndex <= 30) && (columnIndex >= 70) && (columnIndex <= 80))) {

                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if (((rowIndex >= 20) && (rowIndex <= 30) && (columnIndex >= 120) && (columnIndex <= 130))) {

                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if (((rowIndex >= 20) && (rowIndex <= 30) && (columnIndex >= 170) && (columnIndex <= 180))) {

                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 70) && (rowIndex <= 80) && (columnIndex >= 70) && (columnIndex <= 80)) {
                    cells[columnIndex][rowIndex] =cellStatePARK;

                } else if ((rowIndex >= 70) && (rowIndex <= 80) && (columnIndex >= 120) && (columnIndex <= 130)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 70) && (rowIndex <= 80) && (columnIndex >= 170) && (columnIndex <= 180)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 120) && (rowIndex <= 130) && (columnIndex >= 70) && (columnIndex <= 80)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 120) && (rowIndex <= 130) && (columnIndex >= 120) && (columnIndex <= 130)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 120) && (rowIndex <= 130) && (columnIndex >= 170) && (columnIndex <= 180)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 170) && (rowIndex <= 180) && (columnIndex >= 70) && (columnIndex <= 80)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 170) && (rowIndex <= 180) && (columnIndex >= 120) && (columnIndex <= 130)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex >= 170) && (rowIndex <= 180) && (columnIndex >= 170) && (columnIndex <= 180)) {
                    cells[columnIndex][rowIndex] = cellStatePARK;

                } else if ((rowIndex === 25) || (rowIndex === 75) || (rowIndex === 125) || (rowIndex === 175) || (columnIndex === 25) || (columnIndex === 75) || (columnIndex === 125) || (columnIndex === 175) || (rowIndex === 99) || (rowIndex === 100) || (columnIndex === 100) || (columnIndex === 99) || (rowIndex === 49) || (rowIndex === 50) || (rowIndex === 149) || (rowIndex === 150) || (columnIndex === 49) || (columnIndex === 50) || (columnIndex === 149) || (columnIndex === 150)) {
                    cells[columnIndex][rowIndex] = cellStateROAD;
                } else {
                    cells[columnIndex][rowIndex] = cellStateDead;

                }
                


            }

        }

 axios.get('http://localhost:4000/plots')
     .then((response) => {
         const data = response.data;
         const length = data.length;

    for(let i=0; i< length;i++)
                {

                 if((data[i].price <50)&& (cells[data[i].column][data[i].row]===cellStateDead))
                    cells[data[i].column][data[i].row] = cellStateCHEEPPLOT;
                
                    else if((data[i].price >50) && (data[i].price < 150)&& (cells[data[i].column][data[i].row]===cellStateDead))
                    cells[data[i].column][data[i].row] = cellStateMEDIOCREPLOT;
                
                    else if(data[i].price >150 && (cells[data[i].column][data[i].row]===cellStateDead))
                    {
                    cells[data[i].column][data[i].row] = cellStateHIGHPLOT;
                }
            }
            

     })
        
     
        

        return cells;
    }



    function toggleCellState(columnIndex, rowIndex) {


        console.log(usertype);
        axios.get('http://localhost:4000/plots')
     .then((response) => {
         const data = response.data;
         const length = data.length;
        for(var i=0; i < length; i++)
        {

            if((Number(data[i].row) === rowIndex) && (Number(data[i].column) === columnIndex) && (usertype === "buyer"))
            {
                localStorage.setItem("plot",data[i]._id);
                localStorage.setItem("ownerNameId", data[i].userid);

                console.log( data[i].userid +"hi")

                window.location ="/buyerplotpopup";
            }
            else if((Number(data[i].row) === rowIndex) && (Number(data[i].column) === columnIndex) && (usertype === "seller"))
            {
                
                localStorage.setItem("plot",data[i]._id);
                localStorage.setItem("ownerNameId", data[i].userid);

                const selleruserid= localStorage.getItem("loguserid");
                const plotOwnerName= localStorage.getItem("ownerNameId");

                if(selleruserid !== plotOwnerName)
                {
                window.location ="/guestpopup"
                }
                else{

                console.log( data[i].userid)
                window.location ="/sellerpopup";
                }
            }
             else if(((Number(data[i].row) === rowIndex) && (Number(data[i].column) === columnIndex) && (usertype === "guest")))
            {
                localStorage.setItem("plot",data[i]._id);
                window.location ="/guestpopup";
            }
        }
    })
    
        const newCellsState = cells;
        
        newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex];

        setState({
            newCellsState
        })
    }



    function renderCells() {

        return ( 
            
            <div className = "MetaCentraland__cells">  {
                cells.map((rows, columnIndex) => {
                    return renderColumn(rows, columnIndex)
                })
            } 
           </div>
           

            
        );
    }

    function renderColumn(rows, columnIndex) {

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
        


function cellColoring(cellState) {
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

