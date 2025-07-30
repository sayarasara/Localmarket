import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

function FormExample() {
  const { Formik } = formik;
   const notify = () => toast("Signup successful!");

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    //zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        city: '',
        state: '',
        //zip: '',
        terms: false,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="card bg-blue-200 text-blue-900 w-full max-w-sm shrink-0 shadow-4xl">
            <h1 className="text-5xl font-bold">Create Account</h1>
          <Row className="mb-9 text-xl p-4" bg="secondary">
            <Form.Group as={Col} md="6"  controlId="validationFormik01" className='p-4'>
              <Form.Label>First name :</Form.Label>
              <Form.Control
               className=' bg-blue-100 '
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <br></br>
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02" className='p-4'>
              <Form.Label>Last name :</Form.Label>
              <Form.Control
               className=' bg-blue-100 '

                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <br></br>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername" className='p-4'>
              <Form.Label>Username :</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
               className=' bg-blue-100 '

                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          
          <Row className="mb-3 text-xl  mg-border p-4">
            <Form.Group as={Col} md="6" controlId="validationFormik03" className='p-4'>
              <Form.Label>City :</Form.Label>
              <Form.Control
               className=' bg-blue-100  '

                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />

              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04"className='p-4'>
              <Form.Label>State :</Form.Label>
              <Form.Control
               className=' bg-blue-100 '

                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit" onClick={notify}>Submit form</Button>
            <ToastContainer />
        </Form>
      )}
    </Formik>
  );
}

export default FormExample;