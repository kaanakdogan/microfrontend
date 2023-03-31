import React, { useState } from "react";
import Button from 'component-app/Button'

export default function App() {
  const [message, setMessage] = useState("MFE 2 Text")
  return (
    <div>
      <Button variant="outlined" onClick={() => {
        setMessage("MFE 2 Button Clicked")
      }}>
        {message}
      </Button>
    </div>
  )
}