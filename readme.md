### Umbrella UI

Design animations and export JSON array for use with Arduino RF communications with umbrellas.

### Prerequisites
```
nodejs
npm
```

### Development
Run `npm run dev` to fire up webpack-dev-server. Site is hosted on:
```
	http://localhost:8888/webpack-dev-server/
```

### Production
Run full script, this doesn't provide source-maps
```
	npm start
```

### Notes
All front-end files are kept within the `clients` folder. When webpack runs a build all compiled files are moved into a `public` folder which is created at the time of compilation.

Sass files are loaded within the javascript use `scss-loader`

### TODO's
- Method to push current lights up / down a level.
- Export frames to json array
- 