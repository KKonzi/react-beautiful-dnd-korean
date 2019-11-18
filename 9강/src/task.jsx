import React from 'react';
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}

  display: flex;
`;

/*
* Handler 컴포넌트에 dragHandleProps를 부여함으로써 Handler를 통해서만 task를 Drag and Drop 할 수 있다.
* */
const Handler = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

/*
* <Draggable>
* draggableId : task 의 Id (필수)
* index : 순서 인덱스 (필수)
*
* # provided의 요소들
* 1. {...provided.dropabbleProps}
* These are props need to be applied to the component
* that you want to move around in response to a user input
*
* 2. {...provided.dragHandleProps}
* props that need to be applied to the part of the component
* that we want to use to be able to control the entire component
* Also, Can use this to drag a large item by just a small part of it
* 이 프로젝트에선 task가 통째로 움직여야 하므로 같은 컴포넌트에 속성으로 준다
*
* # snapshot
* contains the number of properties that you can use to style your
* draggable component during a drag
* const draggableSnapshot = {
*   isDragging: true, // boolean
*   draggingOver: 'column1'
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
