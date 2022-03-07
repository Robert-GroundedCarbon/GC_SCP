const CarbonOffset = artifacts.require('GroundedCarbonFarms')
const TOKENID = 0
module.exports = async callback => {
    const gc = await GroundedCarbonFarms.deployed()
    console.log('Let\'s set the tokenURI of your farms')
    const tx = await gc.setTokenURI(0, "https://ipfs.io/ipfs/QmaSED9ZSbdGts5UZqueFJjrJ4oHH3GnmGJdSDrkzpYqRS?filename=the-chainlink-knight.json")
    const tx1 = await gc.setTokenURI(1, "https://ipfs.io/ipfs/QmTvsVaaHTuMNmwXgbfgkrztFEazAPyzmrb4VSS2PbqLjA?filename=the-chainlink-elf.json")
    const tx2 = await gc.setTokenURI(2, "https://ipfs.io/ipfs/QmPZQhiBB6pwcxRgwZe2mx6ZizCPYgq8i4FBMETyWK1V2z?filename=the-chainlink-wizard.json")
    const tx3 = await gc.setTokenURI(3, "https://ipfs.io/ipfs/QmS6aznzxshLMcECPQZjCR94UF22WHu6FMM5HLQvaYL9NP?filename=the-chainlink-orc.json")
    console.log(tx)
    callback(tx.tx)
}
