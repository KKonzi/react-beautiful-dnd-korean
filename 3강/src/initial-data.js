const initialData = {
  tasks: {
    'task1': {
      id: 'Task1',
      content: 'Task1 Content'
    },
    'task2': {
      id: 'Task2',
      content: 'Task2 Content'
    },
    'task3': {
      id: 'Task3',
      content: 'Task3 Content'
    },
    'task4': {
      id: 'Task4',
      content: 'Task4 Content'
    }
  },


  columns: {
    'column1': {
      id: 'Column1',
      title: 'To Do - 1',
      taskIds: ['task1','task2','task3','task4']
    }
  },

  columnOrder: ['column1']
};

export default initialData;
