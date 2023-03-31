import React, { useState, Suspense, lazy } from "react";
import Button from 'component-app/Button';
import "./App.css"

const Mfe1 = lazy(() => import("mfe1/App"))
const Mfe2 = lazy(() => import("mfe2/App"))


export default function App() {
  const [shouldLoadMfe1, setShouldLoadMfe1] = useState(false);
  const [shouldLoadMfe2, setShouldLoadMfe2] = useState(false);

  return (
    <div className="host-container">
      <h1>Host App</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="mfe-container">
          <Button onClick={() => {
            setShouldLoadMfe1(true);
          }}>Load Mfe1</Button>
          {shouldLoadMfe1 && (
            <Suspense fallback={<p>Loading</p>}>
              <Mfe1 />
            </Suspense>
          )}
        </div>

        <div className="mfe-container">
          <Button onClick={() => {
            setShouldLoadMfe2(true);
          }}>Load Mfe2</Button>
          {shouldLoadMfe2 && (
            <Suspense fallback={<p>Loading</p>}>
              <Mfe2 />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}