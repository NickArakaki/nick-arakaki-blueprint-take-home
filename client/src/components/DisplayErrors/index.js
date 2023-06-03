import "./DisplayErrors.css";

export default function DisplayErrors({ errors }) {
  return (
    <>
      {errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
    </>
  );
}
