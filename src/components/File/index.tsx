import React, { useState, useEffect } from "react";
const File = () => {
  function readFile(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    let file = input.files?.[0];
    console.log('File: ', file);
  
    let reader = new FileReader();
  
    if (file) {
      reader.readAsArrayBuffer(file)
      
    }
    reader.onload = function() {
      console.log(reader.result);
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
  }
  return (
    <div >
      <h1>File</h1>
      <input type="file" onChange={readFile}></input>
    </div>
  );
};



export default File;
