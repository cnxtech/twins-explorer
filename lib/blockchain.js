const params = {
    LAST_POW_BLOCK: 400, // 345600
    RAMP_TO_BLOCK: 0,
    LAST_SEESAW_BLOCK: 0
};

const avgBlockTime = 2 * 60; // 2 minutes (120 seconds)

const blocksPerDay = (24 * 60 * 60) / avgBlockTime; // 1440

const blocksPerWeek = blocksPerDay * 7; // 10080

const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 306810

const blocksPerYear = blocksPerDay * 365.25; // 3681720

const mncoins = 100000000.0; //1M TWINS Collateral

const getMNBlocksPerDay = (mns) => {
    return blocksPerDay / mns;
};

const getMNBlocksPerWeek = (mns) => {
    return getMNBlocksPerDay(mns) * (365.25 / 52);
};

const getMNBlocksPerMonth = (mns) => {
    return getMNBlocksPerDay(mns) * (365.25 / 12);
};

const getMNBlocksPerYear = (mns) => {
    return getMNBlocksPerDay(mns) * 365.25;
};

const getMNSubsidy = (nHeight = 0, nMasternodeCount = 0, nMoneySupply = 0) => {
    const blockValue = getSubsidy(nHeight);
    let ret = blockValue * 0.8;
    return ret;
};

const getSubsidy = (nHeight = 1) => {
    let nSubsidy = 0.0;
    // First block with initial pre-mine
    if (nHeight == 1) {
        nSubsidy = 6000000;

        // Release 15220.70 Twins as a reward for each block
        // until max supply of 100 000 000 000 TWINS will
        // be mathematically reachet at block 659605.
    } else if (nHeight < 6569605) {
        nSubsidy = 15220.70;

    } else {
        nSubsidy = 0;
    }



    return nSubsidy;
};

const getROI = (subsidy, mns) => {
    return ((getMNBlocksPerYear(mns) * subsidy) / mncoins) * 100.0;
};

const isAddress = (s) => {
    return typeof(s) === 'string' && s.length === 34;
};

const isBlock = (s) => {
    return !isNaN(s) || (typeof(s) === 'string');
};

const isPoS = (b) => {
    return !!b && b.height > params.LAST_POW_BLOCK; // > 182700
};

const isTX = (s) => {
    return typeof(s) === 'string' && s.length === 64;
};

module.exports = {
    avgBlockTime,
    blocksPerDay,
    blocksPerMonth,
    blocksPerWeek,
    blocksPerYear,
    mncoins,
    params,
    getMNBlocksPerDay,
    getMNBlocksPerMonth,
    getMNBlocksPerWeek,
    getMNBlocksPerYear,
    getMNSubsidy,
    getSubsidy,
    getROI,
    isAddress,
    isBlock,
    isPoS,
    isTX
};