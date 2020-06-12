# Dune-db

## Usage

``` js
const setupDatabase = require ('dune-db')

setupDatabase(config).then( db => {
    const { Agent, Metric } = db 
}).catch(err => console.error(err))
```
