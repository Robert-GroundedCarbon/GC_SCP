const CarbonOffset = artifacts.require('GroundedCarbonFarms')

module.exports = async callback => {
    console.log(process.env.DOG)
    callback('sup')
}
