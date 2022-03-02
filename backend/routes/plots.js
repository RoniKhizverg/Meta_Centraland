const express = require('express');
const router = express.Router()
const plotsTemplatesCopy = require('../models/plot') //import the shceme we have created
const columnsAmount = 200;
const rowsAmount = 200;
const cells = [];
const schemePlots = [];
const SHA256 = require('crypto-js/sha256');
const { hash } = require('bcrypt');

let descriptionCountriesList = [ // plots's description
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
const avaibleForSaleIndex = [true, false];


function getRandomInt(min, max) { //random numbers between  min to max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}




router.get('/', async(req, res) => { // get the all plots we have in the database
    try {
        const plot = await plotsTemplatesCopy.find()
        res.json(plot)
    } catch (err) {
        res.status(500).json({
                message: err.message
            }) // if there is a error we want to send that to the user as json because this is a json api
            //500 error means that there is an error on our server(our fault)
    }

})








router.delete('/:id', getPlot, async(req, res) => { //delete plot according _id
    try {
        await res.plot.remove()
        res.json({
            message: 'Deleted plot!'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.patch('/:id', getPlot, async(req, res) => { //get the plot from the user and update it

    if (req.body.ownerName != null) {
        res.plot.ownerName = req.body.ownerName
    }
    if (req.body.price != null) {
        res.plot.price = req.body.price
    }
    if (req.body.description != null) {
        res.plot.description = req.body.description
    }
    if (req.body.avaibleForSale != null) {
        res.plot.avaibleForSale = req.body.avaibleForSale
    }
    if (req.body.row != null) {
        res.plot.row = req.body.row
    }
    if (req.body.column != null) {
        res.plot.column = req.body.column
    }
    if (req.body.userid != null) {
        res.plot.userid = req.body.userid
    }
    if (req.body.linkToGame != null) {
        res.plot.linkToGame = req.body.linkToGame
    }
    try {
        const updatePlot = await res.plot.save() //the updated version of our plot if they successfully saved 
        res.json(updatePlot)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })

    }


})




async function getPlot(req, res, next) { //get the plot according _id
    let plot
    try {
        plot = await plotsTemplatesCopy.findById(req.params.id)
        if (plot == null) {
            return res.status(404).json({
                message: 'Cannot find plot'
            })
        }
    } catch (err) {
        return res.status(500).json({
                message: err.message
            }) // status 500 means that there is something wrong with our circuit
    }
    res.plot = plot
    next()

}



router.post('/plots', async(request, response) => { //create the plots
    const plots = await plotsTemplatesCopy.find()
    if (plots == "") {
        for (let i = 0; i < 20000; i++) {
            let userPlot = '';

            var price = getRandomInt(15, 200);
            var row = getRandomInt(1, 199);
            var column = getRandomInt(1, 199);
            var countryIndex = getRandomInt(0, 243);
            var availableIndex = getRandomInt(0, 2);
            userPlot = new plotsTemplatesCopy({
                ownerName: "O&R.Ltd",
                price: price,
                description: descriptionCountriesList[countryIndex],
                avaibleForSale: avaibleForSaleIndex[availableIndex],
                row: row,
                column: column,
                userid: request.body.userid,
                hash: SHA256(userPlot.description + userPlot.row + userPlot.column).toString()

            })

            userPlot.save()
        }
        response.json({
            success: "ok"
        })
    } else {
        response.send("have plots already")
    }

})


module.exports = router