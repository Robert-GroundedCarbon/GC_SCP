const CarbonOffset = artifacts.require('GroundedCarbonFarms')
const fs = require('fs')

const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "SoilOrganicCarbonContent",
            "value": 0
        },
        {
            "trait_type": "TonsOfOffset",
            "value": 0
        }
    ]
}
module.exports = async callback => {
    const gc = await CarbonOffset.deployed()
    length = await gc.GetNumberOfFarms()
    index = 0
    while (index < length) {
        console.log('Let\'s get the overview of your farm ' + index + ' of ' + length)
        let FarmMetadata = metadataTemple
        let FarmOverview = await gc.Farms(index)
        index++
        FarmMetadata['name'] = FarmOverview['name']
        if (fs.existsSync('metadata/' + FarmMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('test')
            continue
        }
        console.log(FarmMetadata['name'])
        FarmMetadata['attributes'][0]['value'] = FarmOverview['SoilOrganicCarbonContent']['words'][0]
        filename = 'metadata/' + FarmMetadata['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(FarmMetadata)
        fs.writeFileSync(filename + '.json', data)
    }
    callback(gc)
}
