export function todos(state = [], action:any) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat(action.text);
      default:
        return state;
    }
  }