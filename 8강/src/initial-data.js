const initialData = {
  tasks : {
    'task1': {
      id: 'task1',
      content: 'Task1 Content'
    },
    'task2': {
      id: 'task2',
      content: 'Task2 Content'
    },
    'task3': {
      id: 'task3',
      content: 'Task3 Content'
    },
    'task4': {
      id: 'task4',
      content: 'Task4 Content'
    }
  },


  columns: {
    'column1': {
      id: 'column1',
      title: 'To Do - 1',
      taskIds: ['task1','task2','task3','task4']
    }
  },

  columnOrder: ['column1']
};

export default initialData;
