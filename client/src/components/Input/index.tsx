interface InputProps {
  addTodo: () => Promise<void>;
  inputTitle: string;
  setInputTitle: (title: string) => void;
}

function Input(props: InputProps) {
  return (
    <div className="container">
      <div className="input-container">
        <span className="my-text">Add a new task:</span>
        <input 
          type="text" 
          value={props.inputTitle} 
          onChange={(e) => props.setInputTitle(e.target.value)}
        />
        <button className="my-button" onClick={props.addTodo}>Add Todo</button>
        <br /><br /><br />
      </div>
    </div>
  );
}

export default Input;
