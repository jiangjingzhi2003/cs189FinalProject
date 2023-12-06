import React from 'react';
import "./RefreshStyle.css";

function RefreshButton() {
  
  function refreshPage() {
    window.location.reload(false);
  }
  
  return (
    <div>
      <button onClick={refreshPage} id="refresh">Click to reload!</button>
    </div>
  );
}

export default RefreshButton;