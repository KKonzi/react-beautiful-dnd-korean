import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'
import {DragDropContext} from 'react-beautiful-dnd';

import initialData from "./initial-data.js";
import Column from './column.jsx'

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    // task에 대한 drag 이벤트가 끝나고 drop되면 column을 reorder할 때 사용될 예정
  }

  render() {
    /*
    * <DragDropContext>
    * onDragStart
    * onDragUpdate
    * onDragEnd (필수)
    * */
    return (
      <DragDropContext
        onDragEnd = {this.onDragEnd}
      >

        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </DragDropContext>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
