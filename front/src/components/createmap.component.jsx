import '../MetaCentraland/MetaCentraland.css'
import React from 'react';
import axios from 'axios';



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

        generatePlots();
        this.state = {
            cells: this.initializeCells(),
            user: [],
            plots:[],
            countries:[]
        };

    }
    async componentDidMount() {
     axios.get('http://localhost:4000/signupUsers')
     .then((response) => {
         const data = response.data;
         var length = data.length;
         const userid = localStorage.getItem('userid');
         if(length===0)
         {
            this.setState({user: "Welcome Guest"});

         }
         for(var i=0; i < length; i++)
         {
            if(data[i].ID === userid )
            {
                 this.setState({user: data[i].name +" has " + data[i].wallet + " $"} );

            }
      }
   
  });
}



    initializeCells() {
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
        axios.get('http://localhost:4000/plots')
     .then((response) => {
         const data = response.data;
         const length = data.length;
    for(let i=0; i< length;i++)
                {

                 if((data[i].price <50)&& (cells[data[i].row][data[i].column]===createMap.cellState.DEAD))
                    cells[data[i].row][data[i].column] = createMap.cellState.CHEEPPLOT;
                
                    else if((data[i].price >50) && (data[i].price < 150)&& (cells[data[i].row][data[i].column]===createMap.cellState.DEAD))
                    cells[data[i].row][data[i].column] = createMap.cellState.MEDIOCREPLOT;
                
                    else if(data[i].price >150 && (cells[data[i].row][data[i].column]===createMap.cellState.DEAD))
                    {
                    cells[data[i].row][data[i].column] = createMap.cellState.HIGHPLOT;
                }
            }
     })
        
        // while (count < 3000) {
        //     num1 = getRandomInt(200);
        //     num2 = getRandomInt(200);
        //     if ((cells[num1][num2] === createMap.cellState.DEAD))

        //         cells[num1][num2] = createMap.cellState.EMPTYCELL;
        //     count++;
        // }

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
function generatePlots()
{
for(var i=0;i<1000;i++)
{

  var price = getRandomInt(200) ;
  var row = getRandomInt(200);
  var column = getRandomInt(200);
  var countryIndex = getRandomInt(242);
  const newPlot = {
      ownerName:"O&R.Ltd",
      price: price,
      description: countriesList[countryIndex].toString,
       avaibleForSale:true,
       row: row,
       column:column,
       userid:"316283696"
    }
      axios.post('http://localhost:4000/plots/plots',newPlot)
        
}
}

    const countriesList = [ 
    "",
    " Everydays: The First 5000 Days",
    "Jack Dorsey's first tweet",
    "The origins of the internet",
    "CryptoPunks",
    "American Samoa",
    "AndorrA",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of the",
    "Cook Islands",
    "Costa Rica",
    "Cote DIvoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and Mcdonald Islands",
    "Holy See (Vatican City State)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran, Islamic Republic Of",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macedonia, The Former Yugoslav Republic of",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "North Korea",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territory, Occupied",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "RWANDA",
    "Saint Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan, Province of China",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Virgin Islands, British",
    "Virgin Islands, U.S.",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];
  