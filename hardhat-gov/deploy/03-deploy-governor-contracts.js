const { verify } = require("../helper-functions")

const {
    networkConfig,
    developmentChains,
    QUORUM_PERCENTAGE,
    VOTING_PERIOD,
    VOTING_DELAY,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments, network }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    log("Deploying GovernorContract and waiting for confirmations...")
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            QUORUM_PERCENTAGE,
            VOTING_PERIOD,
            VOTING_DELAY,
        ],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log(`GovernorContract at ${governorContract.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(governorContract.address, args)
    }
}

module.exports.tags = ["all", "governor"]
