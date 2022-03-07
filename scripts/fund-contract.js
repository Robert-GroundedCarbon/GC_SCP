const GroundedCarbonFarms = artifacts.require('GroundedCarbonFarms')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')
const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || '3000000000000000000'

module.exports = async callback => {
  try {
    const gc = await GroundedCarbonFarms.deployed()

    const tokenAddress = await gc.LinkToken()
    console.log("Chainlink Token Address: ", tokenAddress)
    const token = await LinkTokenInterface.at(tokenAddress)
    console.log('Funding contract:', gc.address)
    const tx = await token.transfer(gc.address, payment)
    callback(tx.tx)
  } catch (err) {
    callback(err)
  }
}
