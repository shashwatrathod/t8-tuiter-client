import { useState } from "react";

const CreateTuit = ({ initialContent = "", tuitOnClick }) => {
  const [tuit, setTuit] = useState(initialContent);

  return (
    <>
      <div className="d-flex">
        <div className="p-2">
          <img
            className="ttr-width-50px rounded-circle"
            src="../images/nasa-logo.jpg"
          />
        </div>
        <div className="p-2 w-100">
          <textarea
            onChange={(e) => setTuit(e.target.value)}
            placeholder="What's happening?"
            className="w-100 border-0"
            defaultValue={initialContent}
          ></textarea>
          <div className="row">
            <div className="col-10 ttr-font-size-150pc text-primary">
              <i className="fas fa-portrait me-3"></i>
              <i className="far fa-gif me-3"></i>
              <i className="far fa-bar-chart me-3"></i>
              <i className="far fa-face-smile me-3"></i>
              <i className="far fa-calendar me-3"></i>
              <i className="far fa-map-location me-3"></i>
            </div>
            <div className="col-2">
              <a
                onClick={() => tuitOnClick({ tuit })}
                className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}
              >
                Tuit
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTuit;
