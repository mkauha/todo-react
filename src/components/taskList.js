import '../style.css';
import React, { useState, useEffect } from 'react';
import _uniqueId from 'lodash/uniqueId';

import { List, Checkbox, Input, Typography, Button  } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const initData = () => {
  const json = localStorage.getItem("taskData");
  let savedTasks = [];

  if(json) {
    savedTasks = JSON.parse(json);
    console.log(savedTasks);
  } else {

  }
  
  return savedTasks;
}

export default function TaskList() {
  const [ taskData, setTaskData ] = useState(initData)
  const [ inputData, setInputData ] = useState('')
  
  useEffect(() => {
    const json = JSON.stringify(taskData);
    localStorage.setItem("taskData", json);
  }, [taskData]);

  const onAddTask = e => {
    e.preventDefault();
    setTaskData(taskData.concat({id: _uniqueId(), title: inputData, isDone: false }));
    //console.log(`add task ${inputData}`);
    setInputData('');
  }

  const onRemoveTask = (item) => {
    let newTaskData = taskData.filter(task => task !== item);
    setTaskData(newTaskData); 
    //console.log(`remove task ${item.title}`);
  }

  const onClear = () => {
    let emptyTaskData = [];
    setTaskData(emptyTaskData); 
    //console.log(`tasks cleared`);
  }

  const onTaskDone = (item) => {
    for(let task of taskData) {
      if(task.id === item.id) {
        task.isDone = !task.isDone;
      }
    }
    setTaskData(taskData.slice()); 
  }

  return (
    <div className="tasklist">
      <div className="clear-btn" >          
        <Button onClick={onClear}>Clear</Button>
      </div>
      <List
        header={      
          <div className="tasklist-header" >          
            <Text>Tasks</Text>
          </div>
        }
        bordered
        size="large"
        itemLayout="horizontal"
        dataSource={taskData}
        renderItem={item => (
          <List.Item
          key={item.id}
            actions={[
              <DeleteOutlined onClick={() => onRemoveTask(item)}/>,
            ]}>
            <List.Item.Meta
              title={<Text disabled={item.isDone}>{item.title}</Text>}
              avatar={<Checkbox onChange={() => onTaskDone(item)} checked={item.isDone}></Checkbox>}
            />
        </List.Item>
        )}
    >
    </List>
    <div className="input" > 
      <Input value={inputData} onChange={(e) => setInputData(e.target.value)} onPressEnter={onAddTask} placeholder="Add task" size="large" suffix={
        <Button onClick={onAddTask} type="primary" icon={<PlusOutlined/>} >Add</Button>}>
      </Input>
    </div>
  </div>
  );
}
