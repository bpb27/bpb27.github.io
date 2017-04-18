(function () {

	// chartCtrl is globally defined in index.html (used to keep state)

	chartCtrl.colors = {
		'green': {
			color: 'rgba(85, 165, 93, 0.6)',
			border: 'rgb(85, 165, 93)'
		},
		'purple': {
			color: 'rgba(152, 75, 192, 0.6)',
			border: 'rgb(152, 75, 192)'
		},
		'pink': {
			color: 'rgba(255, 99, 132, 0.6)',
			border: 'rgb(255, 99, 132)'
		},
		'blue': {
			color: 'rgba(54, 162, 235, 0.6)',
			border: 'rgb(54, 162, 235)',
		},
		'yellow': {
			color: 'rgba(255, 206, 86, 0.6)',
			border: 'rgb(255, 206, 86)',
		},
		'orange': {
			color: 'rgba(251, 143, 75, 0.6)',
			border: 'rgb(251, 143, 75)',
		}
	}

	chartCtrl.getColorLists = function (order) {
		var colors = [];
		var borders = [];

		if (order) {
			order.forEach(function (color) {
				colors.push(chartCtrl.colors[color].color);
				borders.push(chartCtrl.colors[color].border);
			});
		} else {
			Object.keys(chartCtrl.colors).forEach(function (color) {
				colors.push(chartCtrl.colors[color].color);
				borders.push(chartCtrl.colors[color].border);
			});
		}

		return {
			colors: colors,
			borders: borders
		}
	}

	chartCtrl.datasets = {
		'chartCondoms': {
			'women': [71, 81, 86],
			'men': [60, 72, 81]
		},
		'chartComprehensive': {
			'women': [26, 36, 39],
			'men': [20, 27, 31]
		},
		'chartBreastfeeding': {
			'women': [74, 81, 82],
			'men': [67, 72, 74]
		},
		'chartMtct': {
			'women': [50, 79, 87],
			'men': [39, 58, 70]
		},
		'chartTested': {
			'women': [12, 66, 84],
			'men': [9, 37, 63]
		},
		'chartPrevalence': {
			'women': [26.3, 26.7, 29.7],
			'men': [19.0, 18.0, 18.6]
		},
		'chartWater': {
			labels: ["unimproved source", "protected well or spring", "tubewell or borehole", "public tap or standpipe", "piped water into property"],
			numbers: [16, 7, 6, 46, 26]
		},
		'chartSanitation': {
			labels: ["no facility / bush / field", "shared facility", "improved facility"],
			numbers: [27, 25, 47]
		},
		'chartNearestFacility': {
			labels: ["20 minutes or less", "20-40 minutes", "40-60 minutes", "60-120 minutes", "120 minutes or more"],
			numbers: [12.8, 21.6, 16.5, 21.7, 27.3]
		},
		'chartInfantMortality': {
			range: [0, 140],
			lines: [
				{
					label: "under-5 mortality",
					numbers: [113, 117, 85]
        },
				{
					label: "infant mortality",
					numbers: [91, 91, 59]
        },
				{
					label: "neonatal mortality",
					numbers: [46, 47, 34]
        }
      ]
		},
		'chartBirthDelivery': {
			range: [0, 100],
			lines: [
				{
					label: "delivered in health facility",
					numbers: [52, 59, 77]
        },
				{
					label: "delivered at home",
					numbers: [45, 40, 23]
        }
      ]
		},
		'chartVaccinations': {
			range: [0, 100],
			lines: [
				{
					label: "all basic vaccinations",
					numbers: [68, 62, 68]
        },
				{
					label: "no vaccinations",
					numbers: [2, 3, 1]
        }
      ]
		},
		'chartDiarrhea': {
			labels: ["<6", "6-11", "12-23", "24-35", "36-47", "48-59", "Total"],
			numbers: [6, 22, 22, 9, 6, 5, 12],
			type: 'bar'
		},
		'chartDiarrheaTreatment': {
			labels: ["Taken to a health provider", "ORS or RHF", "Increased fluids", "Antibiotics", "Home remedy", "No treatment"],
			numbers: [51, 75, 22, 16, 23, 18],
			type: 'horizontalBar'
		}
	}

	chartCtrl.createBarChart = function (chartId) {
		var data = chartCtrl.datasets[chartId];
		var colors = chartCtrl.getColorLists();
		var ctx = document.getElementById(chartId);
		var barChart = new Chart(ctx, {
			type: data.type,
			data: {
				labels: data.labels,
				datasets: [{
					label: 'Diarrhea',
					data: data.numbers,
					backgroundColor: colors.colors,
					borderColor: colors.borders,
					borderWidth: 1
            }]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
                }]
				},
				legend: {
					display: false
				}
			}
		});
	}

	chartCtrl.createDonutChart = function (chartId) {
		var data = chartCtrl.datasets[chartId];
		var colors = chartCtrl.getColorLists();

		var ctx = document.getElementById(chartId);
		var myDoughnutChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: data.labels,
				datasets: [
					{
						data: data.numbers,
						backgroundColor: colors.colors,
						hoverBackgroundColor: colors.border
          }
        ]
			}
		});
	}

	chartCtrl.createLineChart = function (chartId) {
		var data = chartCtrl.datasets[chartId];
		var ctx = document.getElementById(chartId);
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ["2004", "2009", "2014"],
				datasets: lineChartDataset(data.lines.slice())
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							min: data.range[0],
							max: data.range[1]
						}
              }]
				}
			}
		});
	}

	chartCtrl.createGenderedLineChart = function (chartId, useSingleCanvas) {
		var women = chartCtrl.datasets[chartId]['women'];
		var men = chartCtrl.datasets[chartId]['men'];
		var ctx = document.getElementById(useSingleCanvas || chartId);
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ["2004", "2009", "2014"],
				datasets: [
              genderedLineChartDataset(women, "Women"),
              genderedLineChartDataset(men, "Men"),
            ]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							min: 0,
							max: 100
						}
              }]
				}
			}
		});
	}

	chartCtrl.changeText = function (selector, element) {
		$(selector).text(element.textContent);
	}

	// private functions

	function lineChartDataset(data) {
		var colors = chartCtrl.getColorLists(['blue', 'yellow', 'orange']);
		return data.map(function (item, i) {
			return {
				label: item.label,
				fill: false,
				lineTension: 0.3,
				backgroundColor: colors.colors[i],
				borderColor: colors.borders[i],
				data: item.numbers
			}
		});
	}

	function genderedLineChartDataset(numbers, gender) {
		return {
			label: gender,
			fill: false,
			lineTension: 0.3,
			backgroundColor: gender === "Women" ? chartCtrl.colors.orange.color : chartCtrl.colors.blue.color,
			borderColor: gender === "Women" ? chartCtrl.colors.orange.border : chartCtrl.colors.blue.color,
			data: numbers
		}
	}

	function getProp(data, prop) {
		return data.map(function (item) {
			return item[prop];
		});
	}

})();
