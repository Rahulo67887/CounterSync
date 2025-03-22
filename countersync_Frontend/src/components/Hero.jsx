const Hero = () => {
  return (
    <div className="hero-container">
      <div class="rectangle">
        <div className="form-detail">
          <p className="form-p">Form No : </p>
          <input
            id="squareInput"
            class="input-square"
            type="number"
            value="33"
          />
        </div>
        <div className="form-buttons">
          <button type="button" class="form-btn btn btn-success">
            Done
          </button>
          <button type="button" class="form-btn btn btn-warning">
            Pass
          </button>
          <button type="button" class="form-btn btn btn-danger">
            Reject
          </button>
        </div>
        <div className="passed-forms">
          <p className="passed-p">Passed Forms : </p>
          <div className="passedform-buttons">
            <button type="button" class="passed-btn btn btn-warning">
              43
            </button>
            <button type="button" class="passed-btn btn btn-warning">
              55
            </button>
            <button type="button" class="passed-btn btn btn-warning">
              13
            </button>
          </div>
        </div>
        <div className="suggestion">
          (Click on the passed form no to enque it)
        </div>
      </div>
    </div>
  );
};

export default Hero;
