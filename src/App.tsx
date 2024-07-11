import './App.css'
import React, {useState} from "react";

type CarInfo = {
    licencePlateNumber: string;
    timestamp: number;
}

function App() {
    const [screen, setScreen] = useState('welcome');
    const [licencePlateNumber, setLicencePlateNumber] = useState('');
    const [garage, setGarage] = useState<CarInfo[]>([]);
    const [isGarageFull, setIsGarageFull] = useState(false);
    const [cost, setCost] = useState(1);
    const capacity = 3;
    const displayCheckInScreen = () => {
        setScreen('checkin');
    }

    const displayCheckOutScreen = () => {
        setScreen('checkout');
    }

    const processLicencePlate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLicencePlateNumber(event.target.value);
    }

    const registerCar = () => {

        //improve - no duplicate licence plate #

        if (garage.length < capacity && licencePlateNumber.length > 0)
        {
            const newCar: CarInfo = { licencePlateNumber, timestamp: Date.now() };
            setGarage(prevGarage => [...prevGarage, newCar]);
        }

        if (garage.length === capacity)
        {
            setIsGarageFull(true);
        }

        setLicencePlateNumber('');
    }

    const calculateRate = () => {

        const carCheckingOut = garage.find(car => car.licencePlateNumber === licencePlateNumber);
        let timeElapsed = 0;

        if (carCheckingOut) {
            timeElapsed = (Date.now() - carCheckingOut.timestamp) / 1000;
        }
        else
        {
            return;
        }

        if (timeElapsed > 30 && timeElapsed < 60)
        {
            setCost(2);
        }
        else if (timeElapsed > 60 && timeElapsed < 90)
        {
            setCost(3);
        }
        if (timeElapsed >= 120)
        {
            setCost(4);
        }
    }

    const checkoutCar = () => {
        const carCheckingOut = garage.find(car => car.licencePlateNumber === licencePlateNumber);

        if (carCheckingOut) {
            setGarage(prevGarage => prevGarage.filter(car => car.licencePlateNumber !== carCheckingOut.licencePlateNumber));
            setLicencePlateNumber('');
        }
    }

    console.log(garage);

    return (
      <>
          <h1>Welcome</h1>
          <p>The current capacity is: {capacity-garage.length}</p>
          <div className='margin-10'>
              <button className='button-margin' onClick={displayCheckInScreen}>In</button>
              <button className='button-margin' onClick={displayCheckOutScreen}>Out</button>
          </div>
          {screen === 'checkin' ?
              <div className='margin-10'>
              <input type='text' placeholder='Enter licence plate #' value={licencePlateNumber} onChange={processLicencePlate} />
                  <div className='margin-10'>
                      { isGarageFull ? <div className='margin-10'>Sorry, we are at capacity, please come again later.</div> : ''}
                      <button className='button-margin' type='button' onClick={registerCar}>Check In</button>
                  </div>
              </div> :
          screen === 'checkout' ?
              <div className='margin-10'>
                  <div className='margin-10'>Currently in: {garage.map(car => car.licencePlateNumber + ` | `)}</div>
                  <input type='text' placeholder='Enter licence plate #' value={licencePlateNumber} onChange={processLicencePlate}/>
                  <div className='margin-10'>
                      { cost && licencePlateNumber ? <div className='margin-10'>Your total is: {cost}</div> : ''}
                      <button className='button-margin' type='button' onClick={calculateRate}>Calculate rate</button>
                      <button className='button-margin' type='button' onClick={checkoutCar}>Process</button>
                  </div>
              </div> : ''
          }
      </>
    )
}

export default App
