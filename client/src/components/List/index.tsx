function List(props: any) {
    return (
        <div>
          <button onClick={props.onClick} id="deleteBtn">Delete</button>
          <button onClick={props.doneClick} id="doneBtn">Done</button>
    
          {props.text}
        </div>
      );
}
export default List;