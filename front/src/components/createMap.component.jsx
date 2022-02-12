import '../MetaCentraland/MetaCentraland.css'
import React from 'react';
import axios from 'axios';





let num1;
let num2;



export default class createMap extends React.Component {

    static field = {
        columnsAmount: 200,
        rowsAmount: 200,
    };
    static cellState = {
        ALIVE: true,
        DEAD: false,
        ROAD: "road",
        PARK: "park",
        EMPTYCELL: "empty",
        CHEEPPLOT: "cheepPlot",
        MEDIOCREPLOT: "mediocrePLOT",
        HIGHPLOT: "highPlot"
    };

    // region Initialization

    constructor(props) {
        super(props);

        this.state = {
            cells: this.initializeCells(),
            user: []
        };

    }
    async componentDidMount() {
     axios.get('http://localhost:4000/signupUsers')
     .then((response) => {
         const data = response.data;
         var length = data.length;

         this.setState({user: data[length-1].name +" has " + data[length-1].wallet + " $"} );
      })
   
    console.log(this.state.user)
  }


//   getRegisterUser = () => {
//     axios.get('http://localhost:4000/signupUsers')
//       .then((response) => {
//         const data = response.data;
//         var length = data.length;
//         <form>
//          data[length-1].name
//         </form>
//         console.log(data[length-1].name);
//       })
//       .catch(() => {
//         alert('Error retrieving data!!!');
//       });
//   }

    initializeCells() {
        let count = 0;
        let cells = [];

        for (let columnIndex = 0; columnIndex < createMap.field.columnsAmount; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < createMap.field.rowsAmount; rowIndex++) {



                if (((rowIndex >= 20) && (rowIndex <= 30) && (columnIndex >= 20) && (columnIndex <= 30))) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 70) && (rowIndex <= 80) && (columnIndex >= 20) && (columnIndex <= 30)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 120) && (rowIndex <= 130) && (columnIndex >= 20) && (columnIndex <= 30)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 170) && (rowIndex <= 180) && (columnIndex >= 20) && (columnIndex <= 30)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if (((rowIndex >= 20) && (rowIndex <= 30) && (columnIndex >= 70) && (columnIndex <= 80))) {

                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if (((rowIndex >= 20) && (rowIndex <= 30) && (columnIndex >= 120) && (columnIndex <= 130))) {

                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if (((rowIndex >= 20) && (rowIndex <= 30) && (columnIndex >= 170) && (columnIndex <= 180))) {

                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 70) && (rowIndex <= 80) && (columnIndex >= 70) && (columnIndex <= 80)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 70) && (rowIndex <= 80) && (columnIndex >= 120) && (columnIndex <= 130)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 70) && (rowIndex <= 80) && (columnIndex >= 170) && (columnIndex <= 180)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 120) && (rowIndex <= 130) && (columnIndex >= 70) && (columnIndex <= 80)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 120) && (rowIndex <= 130) && (columnIndex >= 120) && (columnIndex <= 130)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 120) && (rowIndex <= 130) && (columnIndex >= 170) && (columnIndex <= 180)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 170) && (rowIndex <= 180) && (columnIndex >= 70) && (columnIndex <= 80)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 170) && (rowIndex <= 180) && (columnIndex >= 120) && (columnIndex <= 130)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex >= 170) && (rowIndex <= 180) && (columnIndex >= 170) && (columnIndex <= 180)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.PARK;

                } else if ((rowIndex === 25) || (rowIndex === 75) || (rowIndex === 125) || (rowIndex === 175) || (columnIndex === 25) || (columnIndex === 75) || (columnIndex === 125) || (columnIndex === 175) || (rowIndex === 99) || (rowIndex === 100) || (columnIndex === 100) || (columnIndex === 99) || (rowIndex === 49) || (rowIndex === 50) || (rowIndex === 149) || (rowIndex === 150) || (columnIndex === 49) || (columnIndex === 50) || (columnIndex === 149) || (columnIndex === 150)) {
                    cells[columnIndex][rowIndex] = createMap.cellState.ROAD;
                } else {
                    cells[columnIndex][rowIndex] = createMap.cellState.DEAD;

                }


            }

        }
        while (count < 3000) {
            num1 = getRandomInt(200);
            num2 = getRandomInt(200);
            if ((cells[num1][num2] === createMap.cellState.DEAD))

                cells[num1][num2] = createMap.cellState.EMPTYCELL;
            count++;
        }

        return cells;
    }



    toggleCellState(columnIndex, rowIndex) {
        const newCellsState = this.state.cells;

        newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex];

        this.setState({
            state: newCellsState
        })
    }



    renderCells() {

        return ( 
            
            <div className = "MetaCentraland__cells">  {
                this.state.cells.map((rows, columnIndex) => {
                    return this.renderColumn(rows, columnIndex)
                })
            } 
           </div>
           

            
        );
    }

    renderColumn(rows, columnIndex) {

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
                        () => this.toggleCellState(columnIndex, rowIndex)
                    }
                    />
                })
            } 
                        </div>

                        
        )
    }







    render() {
        if (!this.state.user) {
      return <div>Welcome guest</div>;
      
    }
        return ( 
            <div>
                
        <div className='my_text'>{this.state.user}</div>
        
            <div className = "MetaCentraland" > {
                this.renderCells()
              
            } 
            </div>
            </div>
                        
        );
    }
}


function cellColoring(cellState) {
    let cell = "";
    if (cellState === createMap.cellState.DEAD) {

        cell = "dead";
    }
    if (cellState === createMap.cellState.ROAD) {

        cell = "road";
    }
    if (cellState === createMap.cellState.PARK) {

        cell = "park";
    }
    if (cellState === createMap.cellState.CHEEPPLOT) {

        cell = "cheepPlot";
    }
    if (cellState === createMap.cellState.MEDIOCREPLOT) {

        cell = "mediocrePlot";
    }
    if (cellState === createMap.cellState.HIGHPLOT) {

        cell = "highPlot";
    }
    if (cellState === createMap.cellState.EMPTYCELL) {

        cell = "empty";
    }
    return cell;

}

function getRandomInt(max) {
    let num =
        Math.floor(Math.random() * max);

    return num.toString();

}