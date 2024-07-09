import './App.css'
import React, {useState} from "react";

function App() {
    const [screen, setScreen] = useState('welcome');
    const [licencePlateNumber, setLicencePlateNumber] = useState('');
    const [garage, setGarage] = useState<string[]>([]);
    const [isGarageFull, setIsGarageFull] = useState(false);
    const capacity = 3;
    const displayCheckInScreen = () => {
        setScreen('checkin');
    }

    const displayCheckOutScreen = () => {
        setScreen('checkout');
    }

    const processLicencePlateCheckIn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLicencePlateNumber(event.target.value);
    }

    const registerCar = () => {

        if (garage.length < capacity && licencePlateNumber.length > 0)
        {
            setGarage([...garage, licencePlateNumber]);
        }

        if (garage.length === capacity)
        {
            setIsGarageFull(true);
        }

        localStorage.setItem('licencePlateNumbers', JSON.stringify(garage));
    }

    console.log(licencePlateNumber);
    console.log(garage);


    return (
      <>
          <h1>Welcome</h1>
          <div className='App'>
              <button className='checkInButton' onClick={displayCheckInScreen}>In</button>
              <button className='checkOutButton' onClick={displayCheckOutScreen}>Out</button>
          </div>
          {screen === 'checkin' ? <div className='CheckIn'>
          <input type='text' placeholder='Enter licence plate #' value={licencePlateNumber} onChange={processLicencePlateCheckIn} />
              <div>
                  { isGarageFull ? <div>GARAGE IS FULL</div> : ''}
                  <button type='button' onClick={registerCar}>Check In</button>
              </div>
          </div> :
              screen === 'checkout' ? <div className='CheckOut'>
                  <input type='text' placeholder='Enter licence plate #' value={licencePlateNumber} onChange={processLicencePlateCheckIn}/>
                  <div>
                      <button type='button' onClick={displayCheckInScreen}>Calculate rate</button>
                      <button type='button' onClick={displayCheckInScreen}>Process</button>
                  </div>
              </div> : <div></div>
          }
      </>
    )
}

export default App
