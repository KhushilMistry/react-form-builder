import QuestionEditor from "./components/QuestionEditor";
import {useFormBuilder} from "./hooks/useFormBuilder";
import {Button} from "../../components/Button";
import "./styles.css";

const FormBuilder = () => {
  const {
    handleSaveForm,
    footerNote,
    deleteQuestion,
    updateQuestion,
    addQuestion,
    questions,
    formName,
    setFormName,
    setQuestionRef,
  } = useFormBuilder();

  return (
    <div className="form-builder">
      <div className="form-name-input">
        <input
          type="text"
          placeholder="Enter Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="form-name-field"
        />
      </div>

      <div className="questions-container">
        {questions.map((question) => (
          <QuestionEditor
            key={question.id}
            question={question}
            onUpdate={updateQuestion}
            onDelete={deleteQuestion}
            ref={(ref) => setQuestionRef(question.id, ref)}
          />
        ))}
      </div>

      <div className="actions">
        <Button
          onClick={addQuestion}
          label="Add Question"
          variant="secondary"
        />
        <Button
          onClick={handleSaveForm}
          label="Save Form"
          variant="secondary"
        />
      </div>

      <div className="footer-note">{footerNote}</div>
    </div>
  );
};

export default FormBuilder;
