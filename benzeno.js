
const Benzeno = function benring(rings){
  const  benkeys = Object.keys(rings)
  const benfun = []
  const  benotfun = []
  benkeys.forEach( _k => {
    if(typeof(rings[_k]) === 'function'){
      benfun.push(_k)
    }else{
      benotfun.push(_k)
    }
  })

  const bond = Object.assign({
      ringout: {},
      count:  benfun.length
    },
    Object.create(null)
  )
  for( _i of benotfun){
      bond.ringout[_i] = rings[_i]
  }

  
  return function benzoin(callback){

    const _kb = function(_k){
        return function benback(_data){
          bond.count -= 1
          bond.ringout[_k] = _data
          if( bond.count === 0){
            callback && callback(bond.ringout)
          }
        }
    }

    benfun.forEach( function(_k){
      rings[_k](_kb(_k))
    })
  }
}
