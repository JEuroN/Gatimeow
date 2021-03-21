import './App.css';
import Login from './components/login/login'
import Dash from './components/dash/dash'
import {useState, useLayoutEffect} from 'react'

function App() {

  const [tab, setTab] = useState(true);

  const checkDate = (token) => {
    if (Date.now() >= token * 1000) {
        return false;
      }else
        return true;
}


  useLayoutEffect(()=>{
    let session = JSON.parse(localStorage.getItem('SESSION'));
    console.log(session);
    if(session){
      if(session.tokenObj && checkDate(session.tokenObj.expires_at)) setTab(false);
      else localStorage.removeItem('SESSION');
    }
  }, [])

  return (
    <div className="App">
      {tab === true ? (<Login setTab={setTab} />) : null}
      {tab === false ? (<Dash setTab={setTab}/>) : null }
    </div>
  );
}

export default App;
