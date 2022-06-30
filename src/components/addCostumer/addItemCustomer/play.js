const { useState } = React;

function App() {
  const [checked, setCheckBoxChecked] = useState([]);

  const onAddCategory = (isChecked, value) => {
    const temp = [...checked];

    if (isChecked) {
      temp.push(value);
      setCheckBoxChecked(temp);

      return;
    }

    setCheckBoxChecked(temp.filter((item) => item !== value));
  };

  return (
    <div className="App">
      <ChannelCategory
        key={'channel.key'}
        options={options}
        onChange={onAddCategory}
        title="Add your chatroom to a category so that users can find it easily"
        checked={checked}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
