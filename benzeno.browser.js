if (typeof (window.Benzeno) === 'undefined') {
  window.Benzeno = (function () {
    return function benring (rings) {
      const benkeys = Object.keys(rings)
      const benfun = []
      const benotfun = []
      benkeys.forEach(_k => {
        if (typeof (rings[_k]) === 'function') {
          benfun.push(_k)
        } else {
          benotfun.push(_k)
        }
      })

      const bond = Object.assign({
        ringout: {},
        count: benfun.length,
        err: false
      },
        Object.create(null)
      )
      for (const _i of benotfun) {
        bond.ringout[_i] = rings[_i]
      }

      return function benzoin (callback) {
        const _kb = function (_k) {
          return function benback (...d) {
            bond.count -= 1
            bond.ringout[_k] = d
            bond.err = !!d[0] || bond.err
            if (bond.count === 0) {
              callback && callback(bond.err, bond.ringout)
            }
          }
        }
        benfun.forEach(function (_k) {
          rings[_k](_kb(_k))
        })
      }
    }
  })()
} else {
  console.error('Benzeno was already instanciated before')
}
