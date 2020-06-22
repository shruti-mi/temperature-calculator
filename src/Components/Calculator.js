import React from 'react';
import TemperatureInput from './TemperatureInput';
import BoilingVerdict from './BoilingVerdict';


function toCelsius(celsius) {
	return (celsius * 9 / 5) + 32;
}

function toFahrenheit(fahrenheit) {
	return (fahrenheit - 32)* 5 / 9
}

function tryConvert(value, func) {
	const input = parseFloat(value);
	if (Number.isNaN(input))
		return '';

	const output = func(input);
	const rounded = Math.round(output*1000)/1000;
	return rounded.toString();
}


class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = {temperature: '', scale: 'c'};
	}

	handleFahrenheitChange(temperature) {
		this.setState( {scale: 'f', temperature});
	}

	handleCelsiusChange(temperature) {
		this.setState( {scale: 'c', temperature});
	}

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		return(
			<div>
				<TemperatureInput 
					scale = 'c'
					temperature = {celsius}
					onTemperatureChange = {this.handleCelsiusChange} />
				<TemperatureInput 
					scale = 'f'
					temperature = {fahrenheit}
					onTemperatureChange = {this.handleFahrenheitChange} />
				<BoilingVerdict celsius = {celsius}/>
			</div>
		);
	}
}


export default Calculator;