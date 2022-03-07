const CarbonOffset = artifacts.require('GroundedCarbonFarms')

module.exports = async callback => {
  const gc = await GroundedCarbonFarms.deployed()
  console.log('Creating requests on contract:', gc.address)
  const tx = await gc.requestNewRandomFarm("Regenerative farm field 1")
  const tx2 = await gc.requestNewRandomFarm("Regenerative farm field 2")
  const tx3 = await gc.requestNewRandomFarm("Regenerative farm field 3")
  const tx4 = await gc.requestNewRandomFarm("Regenerative farm field 4")
  callback(tx.tx)
}
