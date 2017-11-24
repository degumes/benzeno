
const Benzeno = _tasks => _callback => {
  const  _k = Object.keys(_tasks)
  const  _kf = _k.filter( _k => typeof(_tasks[_k]) === 'function' )
  const _bond = Object.assign({
      _results: {},
      _count:  _kf.length
    },
    Object.create(null)
  )

  const _kb = _k => _data => {
    _bond._count -= 1
    _bond._results[_k] = _data
    if( _bond._count === 0){
      _callback && _callback(_bond._results)
    }
  }

  _kf.forEach( function(_k){
    _tasks[_k](_kb(_k))
  })

  const  _knf = _k.filter( _k => typeof(_tasks[_k]) !== 'function' )
  for( _i of _knf){
      _bond._results[_i] = _tasks[_i]
  }

}
