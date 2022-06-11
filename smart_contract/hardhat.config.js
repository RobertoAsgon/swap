require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/DHeHKSlbBJx202vpYY5e3on03dmbC42n',
      accounts: [
        '7ba371a19e1846816049850bf17e8c72cf8f5aae5b55f61f430d61eaa8a01b43',
      ],
    },
  },
}