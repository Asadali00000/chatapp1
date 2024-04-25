export const GenderCheck = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex mb-2">
      <div className="form-control">
        <label className={`label gap-2 cursor`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-100"
            checked={selectedGender === 'male'}
            onChange={() => {
              onCheckBoxChange('male');
            }}
          ></input>
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-100"
            checked={selectedGender === 'female'}
            onChange={() => {
              onCheckBoxChange('female');
            }}
          ></input>
        </label>
      </div>
    </div>
  );
};
