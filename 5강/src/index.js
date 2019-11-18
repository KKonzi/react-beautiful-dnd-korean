import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'
import {DragDropContext} from 'react-beautiful-dnd';

import initialData from "./initial-data.js";
import Column from './column.jsx'

class App extends React.Component {
  state = initialData;

  /*
  * # onDragEnd의 파라미터 result의 속성
  * const result = {
  *   draggableId: 'task1',
  *   type: 'TYPE',
  *   reason: 'DROP',
  *   source: {
  *     droppableId: 'column1',
  *     index: 0
  *   },
  *   destination: {
  *     droppableId: 'column1',
  *     index: 1 // null 일 경우 -> 리스트 밖에 drop 하는 경우
  *   }
  * }
  */

  onDragEnd = result => {
    // column 내 task 순서 변경을 state 와 동기화하기 위해 update
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if( destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return; // 같은 위치에 드롭한 경우 > 아무일 할 필요 없음
    }

    const column = this.state.columns[source.droppableId]; // 원래 state 회손하지 않기 위해 복사 배열 생성
    const newTaskIds = Array.from(column.taskIds);

    newTaskIds.splice(source.index, 1); // 움직인 task 위치에서 제거
    newTaskIds.splice(destination.index, 0, draggableId); // destination.index 위치에 draggableId 추가

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    // 변경사항 오버라이딩
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id] : newColumn,
      }
    };

    console.log('newState',newState);
    this.setState(newState);
  };

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
