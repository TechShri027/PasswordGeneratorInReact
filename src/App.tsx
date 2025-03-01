import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

function App() {
  const [length, setlength] = useState(6);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordCopy = useRef(null);
  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstucvxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*?";

    let pass = "";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyclipboardPassword = useCallback(() => {
    passwordCopy.current?.select();
    // passwordCopy.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className="main">
      <div className="box">
        <h1>Password Generator</h1>
        <div className="inputbtn">
          <input
            type="text"
            placeholder="password"
            readOnly
            value={password}
            ref={passwordCopy}
          />

          <button onClick={copyclipboardPassword} className="btn">
            copy
          </button>
        </div>
        <div className="btns">
          <input
            onChange={(e) => {
              setlength(e.target.value);
            }}
            type="range"
            className="range"
            value={length}
            min={6}
            max={20}
          />
          <label>length:{length}</label>

          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setnumberAllowed((prev) => !prev);
            }}
          />
          <label>Number</label>

          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  );
}
export default App;
