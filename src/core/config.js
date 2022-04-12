export const FLEX_STRATEGY = {
    "name": "Flex",
    "isActive": true,
    "config": {
      "network": "localhost",
      "deposit": {
        "aaveCollateralFactor": 88,
        "aaveUtilizationFactor": 70,
        "uniLowerPercentOffset": -30,
        "uniUpperPercentOffset": 5
      },
      "split": {
        "aaveShare": 50,
        "uniShare": 25,
        "sushiShare": 25
      }
    },
    "ownerAddress": ""
  }

export const STRATEGIES = [
    {
        id: 1,
        name: 'Flex',
        isActive: true,
        risk_factor: '1/5',
        apy: '1.23',
        type: 'Cascade',
        totalInvestment: 0,
        portfolioShare: '100'
    }
]