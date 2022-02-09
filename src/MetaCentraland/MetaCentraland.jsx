import React from "react";
import './MetaCentraland.css'
import $ from 'jquery';

let num;
var board = $('#board');
const rows = 200;
const column = 200;

export default class MetaCentraland extends React.Component {

static field = {
        columnsAmount: 200,
        rowsAmount: 200,
    };
    static cellState = {
        ALIVE: true,
        DEAD: false,
        ROAD: "road",
        PARK: "park",
        EMPTYCELL:"empty",
        PLOT:"plot",
    };

    // region Initialization

    constructor(props) {
        super(props);

        this.state = {
            cells: this.initializeCells(),
            isGameRunning: false,
        };

      //  setInterval(() => this.live(), 0)
    }

    initializeCells() {

        let cells = [];

        for (let columnIndex = 0; columnIndex < MetaCentraland.field.columnsAmount; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < MetaCentraland.field.rowsAmount; rowIndex++) {

                
               
                











                 if(((rowIndex>=20)&&(rowIndex<=30)&&(columnIndex>=20)&&(columnIndex<=30)) ){
                        cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=70)&&(rowIndex<=80)&&(columnIndex>=20)&&(columnIndex<=30)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=120)&&(rowIndex<=130)&&(columnIndex>=20)&&(columnIndex<=30)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=170)&&(rowIndex<=180)&&(columnIndex>=20)&&(columnIndex<=30)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if(((rowIndex>=20)&&(rowIndex<=30)&&(columnIndex>=70)&&(columnIndex<=80)) ){
                    
                        cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if(((rowIndex>=20)&&(rowIndex<=30)&&(columnIndex>=120)&&(columnIndex<=130)) ){
                    
                        cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if(((rowIndex>=20)&&(rowIndex<=30)&&(columnIndex>=170)&&(columnIndex<=180)) ){
                    
                        cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=70)&&(rowIndex<=80)&&(columnIndex>=70)&&(columnIndex<=80)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=70)&&(rowIndex<=80)&&(columnIndex>=120)&&(columnIndex<=130)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=70)&&(rowIndex<=80)&&(columnIndex>=170)&&(columnIndex<=180)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=120)&&(rowIndex<=130)&&(columnIndex>=70)&&(columnIndex<=80)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=120)&&(rowIndex<=130)&&(columnIndex>=120)&&(columnIndex<=130)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=120)&&(rowIndex<=130)&&(columnIndex>=170)&&(columnIndex<=180)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=170)&&(rowIndex<=180)&&(columnIndex>=70)&&(columnIndex<=80)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=170)&&(rowIndex<=180)&&(columnIndex>=120)&&(columnIndex<=130)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }
                else if((rowIndex>=170)&&(rowIndex<=180)&&(columnIndex>=170)&&(columnIndex<=180)){
                      cells[columnIndex][rowIndex] = MetaCentraland.cellState.PARK;

                }


                else if((rowIndex == 25)||(rowIndex == 75)||(rowIndex == 125)|| (rowIndex == 175)||(columnIndex == 25)||(columnIndex == 75)||(columnIndex == 125)|| (columnIndex == 175)||(rowIndex==99)||(rowIndex==100)|| (columnIndex==100)||(columnIndex==99)||(rowIndex== 49)||(rowIndex==50)||(rowIndex== 149)||(rowIndex==150)||(columnIndex== 49)||(columnIndex==50)||(columnIndex== 149)||(columnIndex==150))
                {
                     cells[columnIndex][rowIndex] = MetaCentraland.cellState.ROAD;
                }


                else{
                     cells[columnIndex][rowIndex] = MetaCentraland.cellState.DEAD;

                }
            }
        }

        return cells;
    }

   

    toggleCellState(columnIndex, rowIndex) {
        const newCellsState = this.state.cells;

        newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex];

        this.setState({state: newCellsState})
    }

    toggleIsGameRunning() {
        this.setState({isGameRunning: !this.state.isGameRunning})
    }

    // endregion

    // region Rendering

    renderCells() {

        return (
            <div className="MetaCentraland__cells">
                {this.state.cells.map((rows, columnIndex) => {
                    return this.renderColumn(rows, columnIndex)
                })}
            </div>
        );
    }

    renderColumn(rows, columnIndex) {

        return (
            <div className="MetaCentraland__column" key={`column_${columnIndex}`}>
                {rows.map((cellState, rowIndex) => {
                    const cellModifier = cellColoring(cellState);
                    console.log(cellModifier);
                    return <div
                        className={`MetaCentraland__cell MetaCentraland__cell--${cellModifier}`}
                        key={`cell_${columnIndex}_${rowIndex}`}
                        onClick={() => this.toggleCellState(columnIndex, rowIndex)}
                    />
                })}
            </div>
        )
    }

    



   

    render() {
        return (
            <div className="MetaCentraland">
                {this.renderCells()}
            </div>
        );
    };
}
function cellColoring(cellState) {
        let cell="";
      if(cellState === MetaCentraland.cellState.DEAD )
      {

        cell = "dead";
      }
      if(cellState === MetaCentraland.cellState.ROAD )
      {

        cell = "road";
      }
      if(cellState === MetaCentraland.cellState.PARK )
      {

        cell = "park";
      }
      if(cellState === MetaCentraland.cellState.PLOT )
      {

        cell = "plot";
      }
      if(cellState === MetaCentraland.cellState.EMPTYCELL )
      {

        cell = "empty";
      }
      return cell;
        
    }