import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [passLength, setPassLength] = useState(10);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeChars, setIncludeChars] = useState(false);

  const passwordGen = useCallback(() => {
    let password = "";
    let loopThrough = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) loopThrough += "0123456789";
    if (includeChars) loopThrough += "%&$#2{}[]()*^";

    for (let index = 0; index < passLength; index++) {
      let randomChar = loopThrough.charAt(
        Math.floor(Math.random() * (loopThrough.length + 1))
      );
      password += randomChar;
    }

    setPassword(password);
  }, [passLength, includeNumbers, includeChars, setPassword]);

  useEffect(() => {
    passwordGen();
  }, [passLength, includeChars, includeNumbers, passwordGen]);

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="bg-[#050F2E] rounded-sm p-4">
        <h1 className="text-center text-white text-2xl mb-4">
          Generate Password
        </h1>
        <hr />
        <div className="text-center relative mt-9">
          <h4 className="text-white  opacity-50 text-[10px] text-left absolute top-[-12px] left-[15px]">
            Generated Password
          </h4>
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
            className="bg-[#091741] text-center rounded-md w-[90%] h-[60px] mt-2 text-white px-2 text-[13px]"
          />
        </div>

        <div className="text-center relative mt-9">
          <h4 className="text-white  opacity-50 text-[10px] text-left absolute top-[-17px] left-[15px]">
            Length: {passLength}
          </h4>
          <div className="flex gap-2 items-center justify-center bg-[#091741] rounded-md w-[90%] h-[40px] text-center ml-3">
            <h5 className="text-white text-[12px]">4</h5>
            <input
              type="range"
              min={4}
              max={32}
              value={passLength}
              className="cursor-pointer"
              onChange={(e) => setPassLength(e.target.value)}
            />
            <h5 className="text-white text-[12px]">32</h5>
          </div>
        </div>

        <div className="text-center relative mt-9">
          <h4 className="text-white  opacity-50 text-[10px] text-left absolute top-[-17px] left-[15px]">
            Setting
          </h4>

          <div className="bg-[#091741] flex w-[90%] h-[40px] ml-3 rounded-md items-center justify-between px-3">
            <h3 className="text-white text-[12px] opacity-80">
              Include Numbers
            </h3>
            <label class="switch">
              <input
                type="checkbox"
                class="input"
                defaultChecked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span class="slider round"></span>
            </label>
          </div>

          <div className="bg-[#091741] flex w-[90%] h-[40px] ml-3 rounded-md items-center justify-between px-3 mt-2">
            <h3 className="text-white text-[12px] opacity-80">
              Include Symbols
            </h3>
            <label class="switch">
              <input
                type="checkbox"
                class="input"
                defaultChecked={includeChars}
                onChange={() => setIncludeChars((prev) => !prev)}
              />
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div className="w-full flex items-center justify-center mt-4">
          <button onClick={copyPassword}>
            <span class="circle1"></span>
            <span class="circle2"></span>
            <span class="circle3"></span>
            <span class="circle4"></span>
            <span class="circle5"></span>
            <span class="text">COPY</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
