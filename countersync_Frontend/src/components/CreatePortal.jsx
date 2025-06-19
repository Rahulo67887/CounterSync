const CreatePortal = () => {
  return (
    <div className="hero-container">
      <div className="create-rectangle">
        <form>
          <div className="mb-3">
            <label for="InputDeskInfo" className="form-label create-text">
              Desk Info
            </label>
            <input
              type="text"
              className="form-control-lg create-input"
              id="InputDeskInfo"
            />
          </div>
          <div className="mb-3">
            <label for="InputPassword1" className="form-label create-text">
              Password
            </label>
            <input
              type="password"
              className="form-control-lg create-input"
              id="InputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label create-text" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-text">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePortal;
