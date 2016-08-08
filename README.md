# Letmix

## Install

#### Bower
`$> bower install letmix`

#### NPM
`$> npm install letmix`

#### Github
`$> git clone https://github.com/DEVIXAR/Letmix.git`

#### Download
Download from [Letmix Demo](http://letmix.plugin.web.devixar.com/)

#Overview

Jquery плагін для текстових ефектів.
Переглянути [Demo](http://letmix.plugin.web.devixar.com/)

#### Dependencies

`"jquery": "^3.1.0"`

Працює з 1 та 2 версіями також

#### Include

``` html
<script src="lib/jquery.min.js"></script>
<script src="letmix.min.js" type="text/javascript"></script>
```

#### User

```
$('#element').Letmix(); // typing chars
or
$('#element').Letmix('runner'); // run by chars
```

You can use both

```
$('#element').Letmix({
    amountIterations: 3,
    speedIteration: 20,
    chars: ['a', 'b', 'x', 'z'],
    type: 'random',
    colorIteration: '#32f732'
}).ThenFlash(function (e) {
    e.Letmix('runner', {
        direction: 'left=>right',
        color: '0, 100, 200'
    }).ThenFlash(function (e) {
        e.Letmix('runner', {
            direction: 'left=>right',
            color: '0, 100, 200'
        });
    });

    e.Letmix('runner', {
        color: '0, 200, 20'
    }).ThenFlash(function (e) {
        e.Letmix('runner', {
            color: '0, 200, 20'
        });
    });
});
```

For more detail please take a look at [DEMO](http://letmix.plugin.web.devixar.com/)
