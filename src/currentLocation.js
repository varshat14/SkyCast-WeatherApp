import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const dateBuilder = (d) => {
  let months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
  state = {
    lat: 12.97,
    lon: 77.59,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: "Bengaluru,IN",
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    errorMsg: undefined,
  };

  componentDidMount() {
    this.getWeather(this.state.lat, this.state.lon);
    this.timerID = setInterval(() => this.getWeather(this.state.lat, this.state.lon), 600000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();
    this.setState({
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
    });
    switch (this.state.main) {
      case "Haze": this.setState({ icon: "CLEAR_DAY" }); break;
      case "Clouds": this.setState({ icon: "CLOUDY" }); break;
      case "Rain": this.setState({ icon: "RAIN" }); break;
      case "Snow": this.setState({ icon: "SNOW" }); break;
      case "Dust": this.setState({ icon: "WIND" }); break;
      case "Drizzle": this.setState({ icon: "SLEET" }); break;
      case "Fog": case "Smoke": this.setState({ icon: "FOG" }); break;
      case "Tornado": this.setState({ icon: "WIND" }); break;
      default: this.setState({ icon: "CLEAR_DAY" });
    }
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
              <ReactAnimatedWeather icon={this.state.icon} color={defaults.color} size={defaults.size} animate={defaults.animate} />
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div className="current-time"><Clock format="HH:mm:ss" interval={1000} ticking={true} /></div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>{this.state.temperatureC}°<span>C</span></p>
              </div>
            </div>
          </div>
          <Forcast icon={this.state.icon} weather={this.state.main} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
          <h3 style={{ color: "white", fontSize: "30px", fontWeight: "400" }}>Fetching Bengaluru Weather</h3>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
