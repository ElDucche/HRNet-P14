interface Option {
  [key: string]: string;
}

interface DropdownProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  displayValue: string;
}

const Dropdown = ({ options, name, label, value, displayValue }: DropdownProps) => {
    return (
        <label>
              {label}
              <select name={name} id="">
                {
                  options.map((item, index) => (
                    
                    <option key={index} value={item[value]}>{item[displayValue]}</option>
                  ))
                }
              </select>
        </label>
    )
}

export default Dropdown;