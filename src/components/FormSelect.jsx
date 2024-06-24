const FormSelect = ({ label, name, list=[], defaultValue, size }) => {
  if(!Array.isArray(list)){
      console.error("List is not an array");
      list = [];
  }
    return (
      <div className='form-control'>
        <label htmlFor={name} className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <select
          name={name}
    
          className={`select select-bordered ${size}`}
          defaultValue={defaultValue}
        >
          {list.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  export default FormSelect;
  