# ProductPriceTicker

A custom Power BI visual that displays product names and unit prices in a smooth, animated horizontal marquee.

## Features

- Dynamic product names and prices
- Customizable colors and typography
- Adjustable scrolling speed and direction
- Pause animation on hover
- Responsive design

## Technologies

- TypeScript
- Power BI Visuals SDK
- LESS
- Node.js

## Installation

Clone the repository:

```bash
git clone https://github.com/USERNAME/ProductPriceTicker.git
```

Navigate to the project:

```bash
cd ProductPriceTicker
```

Install dependencies:

```bash
npm install
```

## Development

Start the development environment:

```bash
pbiviz start
```

## Build

Generate the Power BI visual package:

```bash
pbiviz package
```

The generated `.pbiviz` file can be imported into Power BI.

## License

MIT

ProductPriceTicker/
│
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── capabilities.json
├── pbiviz.json
│
├── src/
│ ├── visual.ts
│ └── settings.ts
│
├── style/
│ └── visual.less
│
└── node_modules/ (not uploaded)
