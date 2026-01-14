const Hero = () => {
  return (
    <div className="hero-container">
      <div className="rectangle">
        <div className="form-detail">
          <p className="form-p">Form No : </p>
          <input
            id="squareInput"
            className="input-square"
            type="number"
            value="33"
          />
        </div>
        <div className="form-buttons">
          <button type="button" className="form-btn btn btn-success">
            Done
          </button>
          <button type="button" className="form-btn btn btn-warning">
            Pass
          </button>
          <button type="button" className="form-btn btn btn-danger">
            Reject
          </button>
        </div>
        <div className="passed-forms">
          <p className="passed-p">Passed Forms : </p>
          <div className="passedform-buttons">
            {[43, 55, 13].map((num)=>(
              <button key={num}
              className="passed-btn btn btn-warning">{num}</button>
            ))}
          </div>
        </div>

        <div className="suggestion">
          <p>(Click on the passed form no to enque it)</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
