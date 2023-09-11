const { network } = require("hardhat")

// TypeError: moveBlocks is not a function
async function moveBlocks(amount) {
    console.log("Moving blocks...")
    for (let index = 0; index < amount; index++) {
        await network.provider.request({
            method: "evm_mine",
            params: [],
        })
    }
    console.log(`Moved ${amount} blocks`)
}

module.exports = {
    moveBlocks,
}
