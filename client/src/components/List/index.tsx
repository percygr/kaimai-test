function List(props: any) {
    return (
        <div>
          <button onClick={props.onClick} id="deleteBtn">Delete</button>
          <button onClick={props.doneClick} id="doneBtn">
            {props.isDone ? 'Undo Done' : 'Done'}
          </button>
    
          {props.text}
        </div>
      );
}
export default List;