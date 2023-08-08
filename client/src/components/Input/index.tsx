interface InputProps {
  addTodo: () => Promise<void>;
  inputTitle: string;
  setInputTitle: (title: string) => void;
}

function Input(props: InputProps) {
  return (
    <div>
      <input 
        type="text" 
        value={props.inputTitle} 
        onChange={(e) => props.setInputTitle(e.target.value)}
      />
      <button onClick={props.addTodo}>Add Todo</button>
    </div>
  );
}

export default Input;
