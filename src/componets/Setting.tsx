import React from 'react';
import logo from './logo.svg';

function Setting() {
  return (
    <div>
      <h1>セッティング</h1>
      <form>
        <label>
        Name:
        <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Setting;