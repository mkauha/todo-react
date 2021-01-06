import './style.css';

import React from 'react';
import Header from './components/header'
import TaskList from './components/taskList';


export default function App() {
  return (
    <div className="container">
      <Header/>
      <TaskList/>
    </div>
  );
}
