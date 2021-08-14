# javascript-practice

"javascript-practice" is a Website for practicing JavaScript.

# Requirement

- Node.js 10.13.0
- npm 6.9.0
- gulp
  - CLI version: 2.2.0
  - Local version: 4.0.2

# Installation

Install node_modules.

```bash
npm i
```

# Usage

Please start development with a command "npm run dev"

```bash
npm run dev
```

# Note

- `npm run dev`
The default command. Compile sass, pug (watch), compress js files and start browser-sync.<br/>
***Regarding the style, it is necessary to save it as `style.scss` because compilation does not occur just by changing` _config.scss`.***
- `npx gulp publish`
Start compressing the image.<br/>
***It's not included by default, so if you don't run this command, you won't see it just by putting the image in the `src` directory.***

# Author

* Yuto Urushima
* Twitter : https://twitter.com/developer_japan
