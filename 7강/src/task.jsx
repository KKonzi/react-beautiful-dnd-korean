import React from 'react';
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}
`;

/*
* <Draggable>
* draggableId : task 의 Id (필수)
* index : 순서 인덱스 (필수)
*
* # provided의 요소들
* 1. {...provided.draggableProps}
* These are props need to be applied to the component
* that you want to move around in response to a user input
* drag 되고 있거나 되지 않고 있을 때의 움직임을 제어한다.
* provided.innerRef 가 부여된 컴포넌트와 동일한 컴포넌트에 부여되어야 한다.
*
* 2. {...provided.dragHandleProps}
* props that need to be applied to the part of the component
* that we want to use to be able to control the entire component.
* Also, Can use this to drag a large item by just a small part of it.
* Drag 되는 전체 컴포넌트 중에서 클릭했을 때 drag 이벤트 동작할 컴포넌트에 주는 속성
* 이 프로젝트에선 task의 어느 부분에서는 클릭했을 때 drag and drop 발생해야 하므로 Container에 속성을 준다.
*
* # snapshot
* contains the number of properties that you can use to style your
* draggable component during a drag
* 현재 드래그 중인 Draggable한 컴포넌트의 드래그 상태를 알려준다
* const draggableSnapshot = {
*   isDragging: true, // boolean
*   draggingOver: 'column1' // dragging 중인 컴포넌트가 올라가있는 Droppable 컬럼의 id
* }
* */

export default class Task extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref = {provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
