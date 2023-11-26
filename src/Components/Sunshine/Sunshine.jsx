import { useState, useEffect } from "react";
import "./style.scss";
import clsx from "clsx";

const Sunshine = () => {
  const [dataSetName, setDataSetName] = useState("");
  const [dataSet, setDataSet] = useState([]);
  //   const [dataCitySet, setDataCitySet] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  //   const [dataLabel, setDataLabel] = useState("")
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    const retrieveData = async () => {
      const response = await fetch(`http://ap-examen.surge.sh/${dataSetName}`);
      const data = await response.json();
      setDataSet(data);
      setCities(data.map((el) => el.stad));
      setCity("");
    };
    dataSetName.length > 0 ? retrieveData() : "";
  }, [dataSetName]);

  useEffect(() => {
    if (dataSetName === "temperaturen" && city != "") {
      const dataCitySet = dataSet.find((el) => el.stad == city);
      const average = (
        dataCitySet.temperaturen.reduce((acc, el) => acc + el.temperatuur, 0) /
        dataCitySet.temperaturen.length
      ).toFixed(2);
      console.log(`In ${city} de gemiddelde temperatuur was ${average}`);
      setParagraph(`In ${city} de gemiddelde temperatuur was ${average}`);
    } else if (dataSetName === "neerslag" && city != "") {
      const dataCitySet = dataSet.find((el) => el.stad == city);
      const total = dataCitySet.gegevens.reduce(
        (acc, el) => acc + el.neerslag,
        0
      );
      const average = (total / dataCitySet.gegevens.length).toFixed(2);
      console.log(
        `In ${city} the average downpoor was ${average} and in total ${total}`
      );
      setParagraph(
        `In ${city} de gemiddelde neerslag ${average}, en ${total} in totaal.`
      );
    } else if (dataSetName === "zon" && city != "") {
      const dataCitySet = dataSet.find((el) => el.stad == city);
      const total = dataCitySet.stats.reduce((acc, el) => acc + el.zon, 0);
      const average = (total / dataCitySet.stats.length).toFixed(2);
      console.log(
        `In ${city} the average hours sunshine was ${average} and in total ${total}`
      );
      setParagraph(
        `In ${city} het gemiddelde aantal uren zon was ${average}, met ${total.toFixed(
          1
        )} uren in totaal.`
      );
    }
  }, [city]);

  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onDataSetChange = (e) => {
    setDataSetName(e.target.value);
  };

  const fieldsetClass = clsx({
    hidden: cities.length > 0 ? false : true,
  });
  const paragraphClass = clsx({
    hidden: dataSet.length > 0 && city.length > 0 ? false : true,
  });

  return (
    <>
      <h1>Leven in de stad!</h1>
      <div id="container">
        <fieldset>
          <legend>Kies een dataset:</legend>

          <div>
            <input
              type="radio"
              id="temperature"
              name="dataset"
              value="temperaturen"
              checked={dataSetName === "temperaturen"}
              onChange={onDataSetChange}
            />
            <label for="temperature">temperaturen</label>
          </div>
          <div>
            <input
              type="radio"
              id="sun"
              name="dataset"
              value="zon"
              checked={dataSetName === "zon"}
              onChange={onDataSetChange}
            />
            <label for="sun">zon</label>
          </div>
          <div>
            <input
              type="radio"
              id="percipitation"
              name="dataset"
              value="neerslag"
              checked={dataSetName === "neerslag"}
              onChange={onDataSetChange}
            />
            <label for="percipitation">neerslag</label>
          </div>
        </fieldset>
        <fieldset className={fieldsetClass}>
          <legend>Kies een stad:</legend>

          <div>
            <input
              type="radio"
              id="city1"
              name="city"
              value={cities[0]}
              checked={city === cities[0]}
              onChange={onCityChange}
            />
            <label for="city1">{cities[0]}</label>
          </div>

          <div>
            <input
              type="radio"
              id="city2"
              name="city"
              value={cities[1]}
              checked={city === cities[1]}
              onChange={onCityChange}
            />
            <label for="city2">{cities[1]}</label>
          </div>
          <div>
            <input
              type="radio"
              id="city3"
              name="city"
              value={cities[2]}
              checked={city === cities[2]}
              onChange={onCityChange}
            />
            <label for="city3">{cities[2]}</label>
          </div>
        </fieldset>
      </div>
      <p className={paragraphClass}>{paragraph}</p>
    </>
  );
};
export default Sunshine;
