import React from 'react';
import styled from 'styled-components'
import {Droppable} from "react-beautiful-dnd";

import Task from './task.jsx'

const Container = styled.div`
  margin: 8px;
  border: 2px solid lightgrey;
  border-radius: 2px
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

/*
* <Droppable>
* props : droppableId (필수)
* 자식 노드가 React Component를 리턴하는 함수여야 한다.
*
* # provided의 요소들
* 1. {...provided.droppableProps}
* These are props need to be applied to the component
* that you want to designate as your droppable.
* draggable 컴포넌트가 drag and drop 되기 위한 영역에 부여하는 속성
*provided.innerRef 가 부여된 컴포넌트와 동일한 컴포넌트에 부여되어야 한다.
*
* 2. innerRef : function used to supply with
* DOM node of your component to DND
* ReactDOM을 사용하여 DOM 노드를 조회할 필요가 없도록 하기 위해 부여한다.
*
* 3. placeholder : React element that is used to increased the
* available space in droppable during a drag when it's needed
* Droppable의 자식 노드에 추가되어야 하는 속성.
* 드래그하는 동안 필요에 따라 <Droppable />에 빈 공간을 만드는 데 사용된다.
* */

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <TaskList
              ref = {provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task,index) => (
                <Task key={task.id} task={task} index={index}/>
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}
