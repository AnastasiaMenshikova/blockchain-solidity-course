const { verify } = require("../helper-functions")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { getNamedAccounts, deployments, network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments, network }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    log("----------------------------------------------------")
    log("Deploying Box and waiting for confirmations...")
    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: waitBlockConfirmations,
    })
    log(`Box at ${box.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(box.address, args)
    }
    const boxContract = await ethers.getContractAt("Box", box.address)
    const timeLock = await ethers.getContract("TimeLock")
    const transferTx = await boxContract.transferOwnership(timeLock.address)
    await transferTx.wait(1)
}

module.exports.tags = ["all", "box"]
