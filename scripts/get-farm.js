const CarbonOffset = artifacts.require('GroundedCarbonFarms')

module.exports = async callback => {
    const gc = await GroundedCarbonFarms.deployed()
    console.log('Let\'s get the overview of your farm')
    const overview = await gc.Farms(1)
    console.log(overview)
    callback(overview.tx)
}
