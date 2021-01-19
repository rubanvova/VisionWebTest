export const alertErrors = (data) => {
  alert(JSON.stringify(data));
};

export const alertComplete = (props) => {
  alert(props.text);
};
