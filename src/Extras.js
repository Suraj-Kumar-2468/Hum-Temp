import React, {useEffect, useState} from 'react';
import './Extras.css';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import CloudIcon from '@material-ui/icons/Cloud';
import firebase from './firebase';

function Extras() {
    const value = "Chennai";
    const [valueC_temp, setvalueC_temp] = useState(0);
    const value2 = "Mumbai";
    const [valueM_temp,setvalueM_temp] = useState(0);
    let Outside = "Willing to Go Outside ???";
    let Suggest = "✅✅✅ Stay Home, Stay Safe";
    var CopyTempC = valueC_temp;
    var CopyTempM = valueM_temp;
    const [APItempC, setAPItempC] = useState(0);
    const [APItempM, setAPItempM] = useState(0);

    
   useEffect(() => {

    const APIH = firebase.database().ref("APITempChennai");
    APIH.on("value", (snapshot) => {
    let value = snapshot.val();
    setAPItempC(value);
  });

  const APIT = firebase.database().ref("APITempMumbai");
  APIT.on("value", (snapshot) => {
  let value = snapshot.val();
  setAPItempM(value);
});
      let isMounted = true;
      if (isMounted){
        fetchApi();
        fetchMumbaiApi();
        get()
      }
      return () =>{isMounted =false};
      });
    
    const get = () =>{
        firebase.database().ref().update({
            APITempChennai: CopyTempC,
            APITempMumbai: CopyTempM,
        });
      };

    const fetchApi = async () => {
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=a4d8340632dfca4d53dd9e6e6b8d394f`;
        const response = await fetch(URL);
        const resJson = await response.json();
        setvalueC_temp(Math.trunc(resJson.main.temp));  //Decimal Removal Fucntion
      };
    const fetchMumbaiApi = async () => {
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${value2}&units=metric&appid=a4d8340632dfca4d53dd9e6e6b8d394f`;
        const response = await fetch(URL);
        const resJson = await response.json();
        setvalueM_temp(Math.trunc(resJson.main.temp));  //Decimal Removal Fucntion
      };

    return (
        <div className="extras">
            <div className="Info__Panal">
                <Brightness7Icon className="Sun__icon"/>
                <h3 className = "Status__report">{Outside}</h3>
                <p style={{color:"#5fd1e8"}}className="Suggestions"> {Suggest} </p>
            </div>
            <div className="location__panal">
                <p style={{color:"#5fd1e8" , fontWeight:'bold'}}>CITY</p>
                <div className="Environment">
                    <div className="environment__status">
                        <CloudIcon/>    
                    </div>
                    <div className="city__details">
                        <p> {value} </p>
                        <p>{APItempC} ℃</p>
                    </div>

                </div>
                <div className="Environment">
                    <div className="environment__status">
                        <CloudIcon/>    
                    </div>
                    <div className="city__details">
                        <p>{value2} </p>
                        <p>{APItempM} ℃</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Extras
