const Block = (props) => {

  const styles = {
    backgroundColor: props.color,
    width: '200px',
    padding: '10px',
    margin: '10px auto',
  }

  return (
    <div style={styles}>
      {props.children}
    </div>
  )
}

export default Block