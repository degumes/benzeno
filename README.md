# benzeno
yet another async parallel tool. But declarative and recursive.

[This code](https://gist.github.com/branneman/d3e3d98703aa6e31701a) help me to think

## install
```bash
$ npm install benzeno --save
```

## usage
``` javascript
const Benzeno = require('benzeno')

const ring = {
  ben100(cb){
    setTimeout(() => {
      cb( null ,`tout100 delay: ${Date.now()-this.t0}`)
    }, 100)
  },
  ben300(cb){
    setTimeout(() => {
      cb( null, `tout300 delay: ${Date.now()-this.t0}`)
    }, 300)
  },
  benerr(cb){
    setTimeout(() => {
      cb( "its dizzy" )
    }, 0)
  },
  t0: Date.now()
}

const ben = Benzeno(ring)
ben( (err, r) => {
  console.dir(r)
})

/*
{
  t0: 1511800544979,
  benerr: [ 'its dizzy' ],
  ben100: [ null, 'tout100 delay: 101' ],
  ben300: [ null, 'tout300 delay: 301' ]
}
*/
```
## usage minifed at browser
```html
<!-- append at head -->
<script src="https://cdn.jsdelivr.net/npm/benzeno/benzeno.min.js">
  // Global window.Benzeno
  const ben = Benzeno(youring)
  ben( (err, r) => {
    console.dir(r)
  })
</script>
```
