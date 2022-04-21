const exportsConfig = {
  pwa: {
    themeColor: '#90C6ED'
  },

  lintOnSave: false,
  productionSourceMap:false
}

if(process.env.VUE_APP_BASE_API === 'test'){
    exportsConfig.publicPath = '/pbtrade/'
}

module.exports = exportsConfig