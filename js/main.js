// Activity 1
//
//const svg = d3.select('body').append('svg')
//    .attr('width', 500)
//    .attr('height', 500)
//
//const sandwiches = [
//	 { name: "Thesis", price: 7.95, size: "large" },
//	 { name: "Dissertation", price: 8.95, size: "large" },
//	 { name: "Highlander", price: 6.50, size: "small" },
//	 { name: "Just Tuna", price: 6.50, size: "small" },
//	 { name: "So-La", price: 7.95, size: "large" },
//	 { name: "Special", price: 12.50, size: "small" }
//];
//
//svg.selectAll('circle')
//    .data(sandwiches)
//    .enter()
//    .append('circle')
//    .attr('cx', (_, index) => index * 60 + 30)
//    .attr('cy', 30)
//    .attr('r', (sandwich) => sandwich.size === "small" ? 10 : 20)
//    .attr('fill', (sandwich) => sandwich.price < 7 ? "#0000ff" : "#00ffff")
//    .attr('stroke', "#000000")
//    .attr('stroke-width', "2")

// Activity 2

const body = d3.select('body');
d3.csv('/data/cities_and_population.csv').then(data => {
    const cities = data.map(row => {
        return {
            country: row.country,
            city: row.city,
            population: +row.population,
            x: +row.x,
            y: +row.y,
            eu: row.eu === "true"
        };
    });
    const filteredCities = cities.filter(city => city.eu);
    body.append('p').text(`Number of cities: ${filteredCities.length}`);
    const svg = body.append('svg')
        .attr('width', 700)
        .attr('height', 550)

    svg.selectAll('circle')
        .data(filteredCities)
        .enter()
        .append('circle')
        .attr('cx', (city) => city.x)
        .attr('cy', (city) => city.y)
        .attr('r', (city) => city.population < 1000000 ? 4 : 8)
        .attr('fill', 'brown')

    svg.selectAll('text')
        .data(filteredCities)
        .enter()
        .append('text')
        .attr("class", "city-label")
        .attr("x", (city) => city.x)
        .attr("y", (city) => city.y - 10)
        .text((city) => city.city)
        .attr("opacity", (city) => +(city.population >= 1000000))

}).catch(err => {
    console.error("Error loading data");
});
