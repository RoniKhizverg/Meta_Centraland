
import '../MetaCentraland/MetaCentraland.css'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";



let count =0;
    var executed = false;

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
    const[user,setUser] = useState('');
    const[usertype,setUserType] = useState('');
    const [cells,setCells] = useState([[]]);

        
      var colorList = {"<215$": 'red', "<150$": 'yellow', "<50$": 'green'};
      const legend= localStorage.getItem("legened");
    
    useEffect(() => {
       if(legend==1){
Colorize(colorList);
localStorage.setItem("legend",0);
}

    const getLogIn = async () =>{
    try
    {
        const getUserLogIn = (await axios.get('http://localhost:4000/logsIn')).data;

                console.log(getUserLogIn);

    
     if(getUserLogIn == "")
     {
            setUser("Welcome Guest");
            setUserType("guest");
     }
     else
     {
         console.log(getUserLogIn)
        const getUserSignUp = (await axios.get('http://localhost:4000/signupUsers')).data;
        const userid = localStorage.getItem('loguserid');
        for(var i=0; i < getUserSignUp.length;i++)
        {
            if(getUserSignUp[i].ID === userid ) 
            {
                localStorage.setItem("user_id",getUserLogIn[0]._id);
                 setUser(getUserSignUp[i].name +" has " + getUserSignUp[i].wallet + " $" );
                 setUserType(getUserLogIn[0].userType);
                 console.log(getUserLogIn[0].userType);
            }
        }
     }

            }catch(error) {
        console.log(error);
    }
};

getLogIn();
setCells(initializeCells());


        
},[]);


   
    function initializeCells (){ 
        let cells =[]
        let plots=[];
        console.log("hi")
            

for (let columnIndex = 0; columnIndex < columnsAmount; columnIndex++) {
        cells[columnIndex] = [];
        for (let rowIndex = 0; rowIndex < rowsAmount; rowIndex++) {



            if(((rowIndex %50 <30 && rowIndex % 50> 19 )&& (columnIndex % 50<30 && columnIndex % 50 >20)) ){
                cells[columnIndex][rowIndex] = cellStatePARK;
            }
           else if((columnIndex%50<2 && columnIndex>10) || (columnIndex% 25 <1 && columnIndex>10)|| (rowIndex%50<2 && rowIndex>10) || (rowIndex% 25 <1 && rowIndex>10)|| (columnIndex == 199) ||( rowIndex == 199)|| (columnIndex == 0) ||( rowIndex == 0)){
            cells[columnIndex][rowIndex] = cellStateROAD;
           }
            else {
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
const newCellsState = cells;
            setState(newCellsState)
          
    })   
        return cells;
        
    };



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
                if(data[i].avaibleForSale === false)
                {
                    window.location ="/guestpopup"

                }
                else
                {
                

         axios.post('http://localhost:4000/signUpUsers/seller',data[i])
        .then((response) => {
                const data = JSON.stringify(response.data);
                
                localStorage.setItem('signature',data);
        })
      
    
       
                window.location ="/buyerplotpopup";
                }
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
        
function Colorize (colorList) {
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

