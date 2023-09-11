const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    4: {
        name: "rinkeby",
    },
    1: {
        name: "mainnet",
    },
}

const developmentChains = ["hardhat", "localhost"]
const proposalsFile = "proposals.json"
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile = "../nextjs-smartcontract-lottery-fcc/constants/contractAddresses.json"
const MIN_DELAY = 3600
const VOTING_PERIOD = 5
const VOTING_DELAY = 1
const QUORUM_PERCENTAGE = 4
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
const NEW_STORE_VALUE = 77
const FUNC = "store"
const PROPOSAL_DESCRIPTION = "Proposal #1 77 in the Box!"

module.exports = {
    networkConfig,
    developmentChains,
    proposalsFile,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
    MIN_DELAY,
    VOTING_PERIOD,
    VOTING_DELAY,
    QUORUM_PERCENTAGE,
    ADDRESS_ZERO,
    NEW_STORE_VALUE,
    FUNC,
    PROPOSAL_DESCRIPTION,
}
