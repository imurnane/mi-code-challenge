export default function VisualiseResults({ result }) {
  if (result === null) {
    return (
      <div>No result yet</div>
    );
  }
  else return (
    <div>
      Tonight's lotto numbers are {JSON.stringify(result)}
    </div>
  );
}
