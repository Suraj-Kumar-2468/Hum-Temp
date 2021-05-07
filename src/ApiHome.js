import React, { useEffect, useState } from 'react'
import './ApiHome.css'
import firebase from './firebase';

function ApiHome() {

    const [temp, settemp] = useState(0);
    const [humi, sethumi] = useState(0);
    var CopyTemp = temp;
    var CopyHumi = humi;
    const [APItemp, setAPItemp] = useState(0);
    const [APIhumi, setAPIhumi] = useState(0);
    

    useEffect(() => {
      const APIH = firebase.database().ref("APITempDelhi");
      APIH.on("value", (snapshot) => {
      let value = snapshot.val();
      setAPItemp(value);
    });

    const APIT = firebase.database().ref("APIHumiDelhi");
    APIT.on("value", (snapshot) => {
    let value = snapshot.val();
    setAPIhumi(value);
  });

      let isMounted = true;
      if (isMounted){
        fetchApi()
        get()
      }
      return () =>{isMounted =false};
      });

    const get = () =>{
      firebase.database().ref().update({
        APITempDelhi: CopyTemp,
        APIHumiDelhi: CopyHumi,
      });
    };
    

    const fetchApi = async () => {
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=a4d8340632dfca4d53dd9e6e6b8d394f`;
        const response = await fetch(URL);
        const resJson = await response.json();
        settemp(Math.trunc(resJson.main.temp));  //Decimal Removal Fucntion
        sethumi(resJson.main.humidity)
      };

    return (
        <div className = "API_home">
        <h3>{APItemp} ℃</h3>
        <h3>{APIhumi} %</h3>
        
        </div>
    )
}

export default ApiHome
