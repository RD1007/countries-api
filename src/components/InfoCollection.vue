<template>
    <h3>
        <FunctionsComponent ref="FunctionsComponent"></FunctionsComponent>
        <div class="countryname">
            {{ this.$route.params.countryName }}
        </div>
        <div class="centered">
            <ul>
                <img v-if="FlagPic" :src="FlagPic" class="FlagSizing" alt="Flag">
                <li v-for="(fetchCountryInfo, index) in CountryInformation" :key="index">
                    <ul>
                        <li v-for="(value,key) in fetchCountryInfo" :key="key">
                            {{ key }}: {{ Array.isArray(value) ? value.join(', ') : value }}
                        </li>
                    </ul>
                </li>
            </ul>
            <div>
                <img v-if="CoatOfArmsPic" :src="CoatOfArmsPic" class="ArmsSizing" alt="Coat of Arms">
            </div>
        </div>
    </h3>
</template>


<script>

export const formatPopulation = (population) => {
    return (
        Number(population)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
};

export default {
    name: 'InfoCollection',
    data() {
        return {
            CountryInformation: [],
            CoatOfArmsPic: '',
            FlagPic: '',
            Timezone: [],
        };
    },
    methods: {
        fetchCountryInfo() {
            fetch(`https://restcountries.com/v3.1/name/${this.$route.params.countryName}`)
            .then(response => response.json())
            .then(data => {
                this.CountryInformation = data.filter(item => item.name.common ===  this.$route.params.countryName )
                .map((item => ({
                    Flag: item?.flags?.png || "None",
                    "Official Name": item?.name?.official || "None",
                    "Currencies": item?.currencies ? Object.values(item.currencies).map(currency => currency.name) : null || "None",
                    Capital: item?.capital || "None",
                    Continents: item?.continents || "None",
                    Subregion: item?.subregion || "None",
                    Languages: item?.languages ? Object.values(item.languages) : null || "None",
                    "Latitude/Longitude": this.roundingLatLong(item?.latlng) || "None",
                    Population: this.formatPopulation(item?.population) || "None",
                    Timezones: this.fetchTimezone(item?.timezones) || "None",
                    "Current Time": this.fixCountryTime(item?.timezones) || "None",
                    CoatOfArms: item?.coatOfArms?.png || "None",
                    })
                ));
                this.CoatOfArmsPic = this.CountryInformation[0]?.CoatOfArms;
                this.FlagPic = this.CountryInformation[0]?.Flag;
                delete this.CountryInformation[0].CoatOfArms;
                delete this.CountryInformation[0].Flag;
            });
        },
        roundingLatLong(LatLong) {
            let lat = LatLong[0];
            let long = LatLong[1];
            if ((lat % 1) !== 0) {
                lat = lat.toFixed(2);
            }
            if ((long % 1) !== 0) {
                long = long.toFixed(2);
            }
            let latlong = lat + ", " + long;
            return latlong;
        },
        formatPopulation(population) {
            return (
                Number(population)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
        },
        fixCountryTime(timezone) {
            const currentUTCDate = new Date().toISOString();
            let currentUTCHour = parseInt(currentUTCDate.substring(11, 13));
            let currentUTCMinute = parseInt(currentUTCDate.substring(14, 16));
            const UTC = timezone[0].substring(3);
            let sign = UTC[0];
            const hours = parseInt(UTC.substring(1, 3));
            const minutes = parseInt(UTC.substring(4));
            let currentTime = '';
            if (sign == "+") {
                currentUTCHour += hours;
                currentUTCMinute += minutes;
            }
            else if (sign == "-") {
                currentUTCHour -= hours;
                currentUTCMinute -= minutes;
            }
            if (currentUTCMinute < 10) {
                currentUTCMinute.toString();
                currentUTCMinute = '0' + currentUTCMinute;
            }
            if (currentUTCHour > 24) {
                currentUTCHour -= 24;
            }
            if (currentUTCHour > 12) {
                currentUTCHour -= 12;
                currentTime = currentUTCHour + ":" + currentUTCMinute + "pm";
                return currentTime;
            }
            else  {
                currentTime = currentUTCHour + ":" + currentUTCMinute + "am";
                return currentTime;
            }           
        },
        fetchTimezone(UTC) {
            if (UTC == "UTC") {
                return "UTC+0:00";
            }
            else {
                return UTC;
            }
        }        
    },
    mounted() {
        this.formatPopulation();
    },
}
</script>

<style scoped>
.centered {
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
ul {
    list-style-type: none;
    color: inherit;
    text-decoration: none;
    cursor: text;
    display: block;
}
.FlagSizing {
    height: 100px;
    width: 180px;
    margin-left: 30px;
}
.ArmsSizing {
    height: 200px;
    width: 200px;
    margin-left: 65px;
}
.countryname {
    margin-left: 70px;
}
</style>
