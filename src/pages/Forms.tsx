import { Form } from "metropolinet-forms-parser";
import { useState } from "react";
import { useEffect } from "react";
import PanelGroup from "react-panelgroup";
import BOServices from "../BOServices";

const dummyForm = {
  _id: '610a88fe2e300e00308f2df5',
  tags: [],
  systems: [
    {
      _id: '610a88fe2e300e00308f2df6',
      name: 'Rabbanut',
      type: '3',
    },
  ],
  createdBy: 'Guy Shilo',
  updatedBy: 'Guy Shilo Update',
  name: 'Test Guy',
  description: 'Form description',
  category: 'Measurment',
  fields: [
    {
      _id: '610a88ff2e300e00308f2df7',
      name: 'name',
      type: 'text',
      order: '0',
      mandatory: false,
      attributes: [
        {
          _id: '610a88ff2e300e00308f2df8',
          key: 'type',
          value: 'text',
        },
        {
          _id: '610a88ff2e300e00308f2df9',
          key: 'name',
          value: 'name',
        }
      ],
      style: [
        {
          _id: '610a88ff2e300e00308f2dfa',
          key: 'color',
          value: 'green',
        },
        {
          _id: '610a88ff2e300e00308f2dfb',
          key: 'backgroundColor',
          value: 'white',
        },
      ],
      validation: [
        {
          _id: '610a88ff2e300e00308f2dfd',
          name: 'letterValidation',
          regex: "^[a-z\u0590-\u05fe ]+$",
        },
      ],
    },
    {
      _id: '610a88ff2e300e00308f2dfe',
      name: 'authority',
      type: 'text',
      order: '1',
      mandatory: false,
      attributes: [
        {
          _id: '610a88ff2e300e00308f2dff',
          key: 'type',
          value: 'text',
        },
        {
          _id: '610a88ff2e300e00308f2e00',
          key: 'name',
          value: 'authority',
        },
      ],
      style: [
        {
          _id: '610a88ff2e300e00308f2e01',
          key: 'color',
          value: 'blue',
        },
        {
          _id: '610a88ff2e300e00308f2e02',
          key: 'backgroundColor',
          value: 'white',
        },
      ],
      validation: [
        {
          _id: '610a88ff2e300e00308f2e04',
          name: 'letterValidation',
          regex: "^[a-z\u0590-\u05fe ]+$",
        },
      ],
    },
    {
      _id: '610a88ff2e300e00308f2e05',
      name: 'city',
      type: 'text',
      order: '2',
      mandatory: false,
      attributes: [
        {
          _id: '610a88ff2e300e00308f2e06',
          key: 'type',
          value: 'text',
        },
        {
          _id: '610a88ff2e300e00308f2e07',
          key: 'name',
          value: 'city',
        },
      ],
      style: [
        {
          _id: '610a88ff2e300e00308f2e08',
          key: 'color',
          value: 'blue',
        },
        {
          _id: '610a88ff2e300e00308f2e09',
          key: 'backgroundColor',
          value: 'white',
        },
      ],
      validation: [
        {
          _id: '610a88ff2e300e00308f2e0b',
          name: 'letterValidation',
          regex: "^[a-z\u0590-\u05fe ]+$",
        },
      ],
    },
    {
      _id: '610a88ff2e300e00308f2e0c',
      name: 'originalDebt',
      type: 'checkbox',
      items: [{
        value: 'איציק',
        label: 'איציק',
      }, {
        value: 'גיא',
        label: 'גיא',
      }, {
        value: 'טסטים',
        label: 'טסטים',
      },],
      order: '3',
      mandatory: false,
      attributes: [
        {
          _id: '610a88ff2e300e00308f2e0d',
          key: 'type',
          value: 'checkbox',
        },
        {
          _id: '610a88ff2e300e00308f2e0e',
          key: 'name',
          value: 'originalDebt',
        },
      ],
      style: [
        {
          _id: '610a88ff2e300e00308f2e0f',
          key: 'color',
          value: 'blue',
        },
        {
          _id: '610a88ff2e300e00308f2e10',
          key: 'backgroundColor',
          value: 'white',
        },
      ],
      // validation: [
      //   {
      //     _id: '610a88ff2e300e00308f2e11',
      //     name: 'numberValidation',
      //     regex: "^[a-z\u0590-\u05fe ]+$",
      //   },
      // ],
    },
    {
      _id: '610a88ff2e300e00308f2e13',
      name: 'expenses',
      type: 'text',
      order: '4',
      mandatory: false,
      attributes: [
        {
          _id: '610a88ff2e300e00308f2e14',
          key: 'type',
          value: 'number',
        },
        {
          _id: '610a88ff2e300e00308f2e15',
          key: 'name',
          value: 'expenses',
        },
      ],
      style: [
        {
          _id: '610a88ff2e300e00308f2e16',
          key: 'color',
          value: 'green',
        },
        {
          _id: '610a88ff2e300e00308f2e17',
          key: 'backgroundColor',
          value: 'white',
        },
      ],
      validation: [
        {
          _id: '610a88ff2e300e00308f2e18',
          name: 'numberValidation',
          regex: "^[a-z\u0590-\u05fe ]+$",
        },
      ],
    },
    {
      _id: '610a88ff2e300e00308f2e1a',
      name: 'isPayed',
      type: 'text',
      order: '5',
      mandatory: false,
      attributes: [
        {
          _id: '610a88ff2e300e00308f2e1b',
          key: 'type',
          value: 'text',
        },
        {
          _id: '610a88ff2e300e00308f2e1c',
          key: 'name',
          value: 'isPayed',
        },
      ],
      style: [
        {
          _id: '610a88ff2e300e00308f2e1d',
          key: 'color',
          value: 'blue',
        },
        {
          _id: '610a88ff2e300e00308f2e1e',
          key: 'backgroundColor',
          value: 'white',
        },
      ],
      validation: [
        {
          _id: '610a88ff2e300e00308f2e1f',
          name: 'numberValidation',
          regex: "^[a-z\u0590-\u05fe ]+$",
        },
      ],
    }
  ],
  created_at: '2021-08-04T12:33:03.055+0000',
  updated_at: '2021-08-04T12:33:03.055+0000',
  __v: 0,
};
const FormsPage: React.FC = () => {
  const [form, setForm] = useState({});

  const fetchForms = async () => {
    const data = await BOServices.getFormById("60f68cb020e6640031dc587c");
    const getForm = data.data.data.form;
    console.log(JSON.stringify(getForm));
    setForm(getForm);
    return data.data;
  };

  useEffect(() => {
    console.log(form);
  }, [setForm]);
  
  return (
    <div>
      FORMS
      <div style={{ padding: '1rem', 'margin': '1rem' }}>
        <PanelGroup
          spacing={5}
          panelWidths={[
            { size: 1450, minSize: 800 },
            { size: 450, minSize: 450 },
          ]}
        >
          <Form
            customOnSubmit={(values) => console.log(values)}
            customSetState={setForm}
            form={dummyForm}
          />
        </PanelGroup>
      </div>
    </div>
  );
};
export default FormsPage;
