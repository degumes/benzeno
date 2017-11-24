# benzeno
yet another async parallel tool. But declarative and recursive.

[This code](https://gist.github.com/branneman/d3e3d98703aa6e31701a) help me to think

## basic
``` javascript
var ring = {
  tout100(cb){
    setTimeout(() => {
      cb(`tout100 delay: ${Date.now()-this.t0}`)
    }, 100)
  },
  tout300(cb){
    setTimeout(() => {
      cb(`tout300 delay: ${Date.now()-this.t0}`)
    }, 300)
  },
  t0: Date.now()
}

var ben = Benzeno(ring)
ben( r => {
  console.log(r)
})

// {t0: 1511555209898, tout100: 101, tout300: 301}
```

## matrioshkas
``` javascript

var ringinner = {
  ri1(cb) {
    setTimeout(() => {
      cb('ri1 returns');
  }, 100)},
  ri2(cb) {
    setTimeout(() => {
      cb('ri2 returns');
  }, 200)}
}
var beninner = Benzeno(ringinner)

var ringouter = {
  ro1(cb) {
    setTimeout(() => {
      cb('ro1 returns');
  }, 100)},
  beninner,
  r2(cb) {
    setTimeout(() => {
      cb('ro2 returns');
  }, 200)},
}

var benouter = Benzeno(ringouter)
benouter( r => {
  console.log(JSON.stringify(r,null,2))
})

/*
{
  "ro1": "ro1 returns",
  "beninner": {
    "ri1": "ri1 returns",
    "ri2": "ri2 returns"
  },
  "r2": "ro2 returns"
}
*/

```

## circuit
``` javascript
var ring1 = {
  r1a(cb) {
    setTimeout(() => {
      cb(Date.now()-this.t0);
  }, 1000)},
  r1b(cb) {
    setTimeout(() => {
      cb(Date.now()-this.t0);
  }, 1500)},
  t0: Date.now()
}

var ring2 = {
  r2a(cb) {
    setTimeout(() => {
      cb(Date.now()-this.t0);
    }, 500)},
  r2b(cb) {
    setTimeout(() => {
      cb(Date.now()-this.t0);
    }, 1000)}
}

var ben1 = Benzeno(ring1)
ben1( d => {
  var ring3 = Object.assign({},d,ring2)
  ben2 = Benzeno(ring3)
  ben2( d2 => {
    console.dir(JSON.stringify(d2,null,2))
  })
})

/*
{
  "t0": 1511556569398,
  "r1a": 1000,
  "r1b": 1500,
  "r2a": 2001,
  "r2b": 2501
}
*/

```
