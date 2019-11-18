import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components'

import initialData from "./initial-data.js";
import Column from './column.jsx'

const Container = styled.div`
  display: flex;
`

class App extends React.Component {
  state = initialData;

  /*
  * const start = {
  *   draggableId: 'task1',
  *   type: 'TYPE',
  *   source: {
  *     roppableId: 'column1',
  *     index: 0,
  *   }
  * }
  */
  onDragStart = result => {
    console.log('onDragStart');
    document.body.style.color = 'orange';
  };


  /*
  * const update = {
  *   ...start,
  *   destination: {
  *     droppableId: 'column1',
  *     index: 1,
  *   }
  * }
  */
  onDragUpdate = result => {
    console.log('onDragUpdate')
  };


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
    console.log('onDragEnd');
    document.body.style.color = 'inherit';

    // column 내 task 순서 변경을 state 와 동기화하기 위해 update
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return; // 같은 위치에 드롭한 경우 > 아무일 할 필요 없음
    }

    // 원래 state 회손하지 않기 위해 새 배열 생성
    // const column = this.state.columns[source.droppableId]; 이건 column 바뀌는경우 고려하지 않은 것
    const sourceColumn = this.state.columns[source.droppableId];
    const destinationColumn = this.state.columns[destination.droppableId];

    let newState = {}; // 업데이트할 상태값

    if(sourceColumn.id === destinationColumn.id) {
      const newTaskIds = Array.from(sourceColumn.taskIds);

      newTaskIds.splice(source.index, 1); // 움직인 task 제거
      newTaskIds.splice(destination.index, 0, draggableId); // destination.index 위치에 draggableId 추가

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds
      };

      // 변경사항 오버라이딩
      newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id] : newColumn,
        }
      };
    } else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds
      };

      const destinationTaskIds = Array.from(destinationColumn.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds
      };

      newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newSourceColumn.id] : newSourceColumn,
          [newDestinationColumn.id] : newDestinationColumn,
        }
      };
    }

    console.log('newState',newState);
    this.setState(newState);
    return;
  };



  render() {
    /*
    * <DragDropContext>
    * onDragStart
    * onDragUpdate
    * onDragEnd : 필수
    * */
    return (
      <DragDropContext
        onDragStart = {this.onDragStart}
        onDragUpdate = {this.onDragUpdate}
        onDragEnd = {this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>
      </DragDropContext>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
