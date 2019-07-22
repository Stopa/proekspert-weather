# The weather application take-home assignment

The application was developed with the reference material, which is available in the `reference` directory.

## Technology used

Bootstrapped with `create-react-app`, see `README-create-react-app.md` for details.

Uses Redux for application state management and the Thunk middleware for creating actions with side-effects (HTTP requests, `localStorage` manipulation).

Uses Flow for static typing / prop validation.

[Apixu](https://www.apixu.com/) API is used for weather info. This was chosen over OpenWeatherMap because the free version allows to query for 7 day forecast.

SCSS pre-processor is used to author styles, which are written with CSS Modules approach.

## Setup

Application is running at https://weather.stepan.dev. If you want to get it up on your machine, follow these steps:

1. Clone this repository
2. Install dependencies: `yarn` or `npm install`
3. Create `src/config.json`. See `src/config.json.example` for an example configuration file. The file should include your Apixu API key
4. Run the application in development mode: `yarn start` or `npm run-script start`

## Comments

- There is no information on temperature by hour or time of day in Apixu, so instead of morning-day-evening-night, the temperatures table shows the daily high, low, and average
- When testing my solution, I discovered that Apixu does some over-confident autocorrection on queries. For example, if you sent out a query for "Tartu" (which is of course in Estonia), Apixu assumes you mean "Tartus, Syria" and displays the results for that. Even more curiously, Tartu seems to be named "Yur'yev" in their system. Please disregard similar errors as they are on Apixu's side. I got in touch with Apixu customer support and informed them of the mistake
- Apixu returns all temperatures both in Celsius and Fahrenheit, so I didn't do any calculations, but the formula is C*9/5+32
- Apixu weather conditions data was used to create the weather icons. I tried to map the conditions to icons in a way that made sense using "neutral" icons where possible, but some icons are just not very clear, some are duplicated, and some don't exist in the "neutral" set so I had to use the daytime set instead. See `src/data/weather-conditions.json`
- Font sizes, colours, and dimensions were at times estimated from the provided JPGs assuming a 1000px max width
- Responsive design principles were applied to make the application usable at smaller screen sizes. It stays mostly the same for medium sized screens, then some font sizes and little layout modifications are applied for small screens
- Forecast data is cached in `localStorage`, see `src/components/App/App.jsx`
