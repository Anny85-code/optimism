const options = [
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Area', value: 'area' },
  { label: 'Random', value: 'random' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Entertainment', value: 'entertainment' },
];

const ChannelCategory = (props) => {
  console.log(props);
  return (
    <div>
      {props.title}
      <ul>
        {props.options.map((option) => (
          <li key={props.key}>
            <label>
              {option.label}
              <input
                className={props.className}
                name={option.value}
                checked={props.checked.includes(option.value)}
                onChange={(e) => props.onChange(e.target.checked, option.value)}
                type="checkbox"
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelCategory;
