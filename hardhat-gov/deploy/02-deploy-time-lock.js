const { verify } = require("../helper-functions")
const { networkConfig, developmentChains, MIN_DELAY } = require("../helper-hardhat-config")
const { getNamedAccounts, deployments, network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments, network }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    log("----------------------------------------------------")
    log("Deploying TimeLock and waiting for confirmations...")
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: waitBlockConfirmations,
    })
    log(`TimeLock at ${timeLock.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(timeLock.address, args)
    }
}

module.exports.tags = ["all", "timelock"]
