import 'components/Loading.css';

function Loading() {
  return (
    <div
      className="loading d-flex justify-content-center fs-5"
      role="status"
      aria-live="polite"
    >
      Loading…
    </div>
  );
}

export default Loading;
