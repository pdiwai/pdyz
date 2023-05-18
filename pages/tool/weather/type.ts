export interface NowWeatherVo {
	now : NowType;
}
export interface NowType {
	obsTime : string;
	temp : string;
	feelsLike : string;
	icon : string;
	text : string;
	wind360 : string;
	windDir : string;
	windScale : string;
	windSpeed : string;
	humidity : string;
	precip : string;
	pressure : string;
	vis : string;
	cloud : string;
	dew : string;
}

export interface CityVo {
	location : Array<LocationType>
}

export interface LocationType {
	name : string;
	id : string;
	lat : string;
	lon : string;
	adm2 : string;
	adm1 : string;
	country : string;
	tz : string;
	utcOffset : string;
	isDst : string;
	type : string;
	rank : string;
	fxLink : string;
}

export interface DayWeatherVo {
	daily : Array<DailyType>;
}
export interface DailyType {
	fxDate : string;
	sunrise : string;
	sunset : string;
	moonrise : string;
	moonset : string;
	moonPhase : string;
	moonPhaseIcon : string;
	tempMax : string;
	tempMin : string;
	iconDay : string;
	textDay : string;
	iconNight : string;
	textNight : string;
	wind360Day : string;
	windDirDay : string;
	windScaleDay : string;
	windSpeedDay : string;
	wind360Night : string;
	windDirNight : string;
	windScaleNight : string;
	windSpeedNight : string;
	humidity : string;
	precip : string;
	pressure : string;
	vis : string;
	cloud : string;
	uvIndex : string;
}

export interface HourlyWeatherVo {
	hourly : Array<HourlyType>;
}
export interface HourlyType {
	fxTime : string;
	temp : string;
	icon : string;
	text : string;
	wind360 : string;
	windDir : string;
	windScale : string;
	windSpeed : string;
	humidity : string;
	pop : string;
	precip : string;
	pressure : string;
	cloud : string;
	dew : string;
}

export interface CityObjType {
	id : string;
	name : string
}