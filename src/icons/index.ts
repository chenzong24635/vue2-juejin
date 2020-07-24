import SvgIcon from '@/components/SvgIcon'// svg组件

export default{
  install: function(app) {
    app.component('svg-icon', SvgIcon)
    const req = require.context('./svg', false, /\.svg$/)
    const requireAll = requireContext => {
      return requireContext.keys().map(requireContext)
    }
    requireAll(req)
  }
}