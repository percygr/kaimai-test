function List(props: any) {
    const taskStyle = {
        textDecoration: props.isDone ? 'line-through' : 'none'
    };

    return (
        <div className="container">
            <div className="list-container">
                <button 
                    onClick={props.onClick} 
                    id="deleteBtn"
                    className="my-button"
                >Delete</button>
                <button 
                    onClick={props.doneClick} 
                    id="doneBtn"
                    className="my-button"
                >
                {props.isDone ? 'Undo Done' : 'Done'}
                </button>
                <span style={taskStyle} className="my-text">{props.text}</span>
            </div>

        </div>
      );
}
export default List;